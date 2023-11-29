import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./../style/Home.module.css";
import Card from "../components/card/Card";
import Field from "../components/input/field/Field";
import WeatherIcon from "../components/icon/WeatherIcon";
import Icon from "../components/icon/Icon";
import UVCard from "../components/card/UVCard";
import HumidityCard from "../components/card/HumidityCard";
import WindCard from "../components/card/WindCard";
import {
    WeatherStatus,
    norwegianWeatherStatusMapping,
} from "../components/icon/WeatherIcon";
import { useQuery, useQueries } from "@tanstack/react-query";
import Options from "../components/input/selector/Options";

interface PlaceSearchInterface {
    name: string;
    municipality: string;
    county: string;
    location: {
        øst: number;
        nord: number;
        koordsys: number;
    };
}

const PlaceSearch = ({
    name,
    municipality,
    county,
    location,
}: PlaceSearchInterface) => {
    const capitalizeWords = (input: string) => {
        /**
         * @summary Function for word formatting.
         * @param input word to capitalize
         * @returns capitalized word
         */
        return input
            .split(" ") // Split by spaces
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ) // Capitalize first letter and make the rest lowercase
            .join(" "); // Join back together
    };

    const unsamify = (input: string) => {
        /**
         * @summary Trims the input string
         * @param input string
         * @returns trimmed string
         */
        return input.split("-")[0].trim(); // Split by "-" and take the first part, then trim any whitespace
    };

    return (
        <Link
            to={`/location/${name}/${location.nord}/${location.øst}/`}
            className={styles.link2}
        >
            <div className={styles.place_search}>
                <div className={styles.place}>
                    <Icon icon="map-pin" size={20} />
                    <p>{capitalizeWords(name)}</p>
                </div>
                <div className={styles.extra}>
                    <p>{unsamify(municipality)},</p>
                    <p>{unsamify(county)}</p>
                </div>
            </div>
        </Link>
    );
};

const HomePage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [fieldValue, setFieldValue] = useState<string>("");
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        /**
         * @summary Updates the date of the homepage
         */
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 10000); // Update every second

        // Cleanup: clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour clock
    };
    const formattedTime = currentDate.toLocaleTimeString(
        undefined,
        timeOptions
    );

    const dagNavn = [
        "Søndag",
        "Mandag",
        "Tirsdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lørdag",
    ];

    type Plass = {
        stedsnavn: [{ skrivemåte: string }];
        representasjonspunkt: {
            øst: number;
            nord: number;
            koordsys: number;
        };
        fylker: [
            {
                fylkesnavn: string;
                fylkesnummer: number;
            },
        ];
        kommuner: [
            {
                kommunenummer: string;
                kommunenavn: string;
            },
        ];
        stedsnummer: number;
    };

    const dag = dagNavn[currentDate.getDay()];

    type Favorite = {
        name: string;
        lat: number;
        lon: number;
    };

    const favorites: Favorite[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );

    const [currentLocationIndex, setCurrentLocationIndex] = useState<number>(0);

    const [selectedCounty, setSelectedCounty] = useState<string | undefined>(
        sessionStorage.getItem("prefferedCountySelection") as string
    );

    const locationQuery = useQuery({
        /**
         * @summary TanStack Query, fetches API from geonorge to data
         */
        queryKey: ["search", fieldValue, selectedCounty],
        queryFn: () =>
            fetch(
                `https://ws.geonorge.no/stedsnavn/v1/sted?sok=${fieldValue}&fuzzy=true${
                    selectedCounty ? "&fylkesnavn=" + selectedCounty : ""
                }&utkoordsys=4258&treffPerSide=20&side=1`
            )
                .then((res) => res.json())
                .then((data) => {
                    const resultsArray = data.navn; // Extracting the array from data.navn

                    if (!Array.isArray(resultsArray)) {
                        throw new Error(
                            "Expected an array in the API response"
                        );
                    }

                    // Filter out results where kommuner, fylker, or stedsnavn are empty or not defined
                    const filteredData = resultsArray.filter((item: Plass) => {
                        const hasKommuner =
                            item.kommuner && item.kommuner.length > 0;
                        const hasFylker = item.fylker && item.fylker.length > 0;
                        const hasStedsnavn =
                            item.stedsnavn && item.stedsnavn.length > 0;

                        return hasKommuner && hasFylker && hasStedsnavn;
                    });

                    // Filter out duplicates based on the combination
                    const uniqueData = filteredData.reduce(
                        (acc: Plass[], curr: Plass) => {
                            const uniqueKey = `${curr.fylker[0].fylkesnavn}-${curr.kommuner[0].kommunenummer}-${curr.stedsnavn[0].skrivemåte}`;
                            if (
                                !acc.some(
                                    (item: Plass) =>
                                        `${item.fylker[0].fylkesnavn}-${item.kommuner[0].kommunenummer}-${item.stedsnavn[0].skrivemåte}` ===
                                        uniqueKey
                                )
                            ) {
                                acc.push(curr);
                            }
                            return acc;
                        },
                        []
                    );

                    return uniqueData;
                }),
    });

    const fetchWeatherByLonLat = async (lon: number, lat: number) => {
        /**
         * @summary Fetches data through lon and lat
         * @param lon longditude
         * @param lat latitude
         * @returns data fetched by lon and lat
         */
        const response = await fetch(
            `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        return data;
    };

    const weatherQueries = useQueries({
        queries: favorites.map((favorite: Favorite) => {
            return {
                queryKey: ["user", favorite.lon, favorite.lat],
                queryFn: () => fetchWeatherByLonLat(favorite.lon, favorite.lat),
            };
        }),
    });

    useEffect(() => {
        if (favorites.length != 0 && currentLocationIndex == null) {
            setCurrentLocationIndex(0);
        }
    }, [favorites, currentLocationIndex]);

    useEffect(() => {
        locationQuery.refetch();
    }, [fieldValue, locationQuery, locationQuery.refetch]);

    useEffect(() => {
        if (favorites.length == 0) {
            return;
        }
        setUrl(
            `/location/${favorites[currentLocationIndex].name}/${favorites[currentLocationIndex].lat}/${favorites[currentLocationIndex].lon}`
        );
    }, [currentLocationIndex, favorites]);

    const counties = [
        "Troms og Finnmark",
        "Nordland",
        "Trøndelag",
        "Møre og Romsdal",
        "Vestland",
        "Rogaland",
        "Agder",
        "Vestfold og Telemark",
        "Viken",
        "Oslo",
        "Innlandet",
    ];

    return (
        <>
            {fieldValue.length > 0 && (
                <div
                    className={styles.search}
                    onClick={() => setFieldValue("")}
                >
                    <div className={styles.search_box}></div>
                </div>
            )}
            <div
                className={styles.input}
                style={
                    fieldValue.length > 0
                        ? {
                              top: "10vw",
                              width: "80%",
                              left: "8%",
                          }
                        : {
                              paddingLeft: "1vw",
                              paddingRight: "0",
                              paddingTop: "0",
                              paddingBottom: "0",
                          }
                }
            >
                <Field
                    placeholder="Søk for områder"
                    icon={"search"}
                    value={fieldValue}
                    setValue={setFieldValue}
                />
                {fieldValue.length > 0 && (
                    <div className={styles.options}>
                        <Options
                            options={counties}
                            label="Fylke"
                            value={selectedCounty}
                            setValue={setSelectedCounty}
                        />
                        <p
                            className={styles.reset}
                            onClick={() => {
                                setSelectedCounty(undefined);
                            }}
                        >
                            Tilbakestill filtre
                        </p>
                    </div>
                )}
                {fieldValue.length > 0 && (
                    <>
                        <div className={styles.divider}></div>
                        <div className={styles.places}>
                            {locationQuery.data &&
                                locationQuery.data.map((plass: Plass) => (
                                    <PlaceSearch
                                        name={
                                            plass.fylker?.length > 0
                                                ? plass.stedsnavn[0].skrivemåte
                                                : "Ukjent"
                                        }
                                        municipality={
                                            plass.kommuner?.length > 0
                                                ? plass.kommuner[0].kommunenavn
                                                : "Ukjent"
                                        }
                                        county={
                                            plass.fylker?.length > 0
                                                ? plass.fylker[0].fylkesnavn
                                                : "Ukjent"
                                        }
                                        location={plass.representasjonspunkt}
                                    />
                                ))}
                        </div>
                    </>
                )}
            </div>
            <main className={styles.main}>
                <div className={styles.sidebar}>
                    {favorites.length != 0 ? (
                        <>
                            <div className={styles.current_weather}>
                                <WeatherIcon
                                    status={
                                        weatherQueries[currentLocationIndex]
                                            .data?.properties.timeseries[0].data
                                            .next_1_hours?.summary?.symbol_code
                                    }
                                    size={120}
                                />
                            </div>
                            <h3 className={styles.temperature}>
                                {
                                    weatherQueries[currentLocationIndex].data
                                        ?.properties.timeseries[0].data.instant
                                        .details.air_temperature
                                }
                                °C
                            </h3>
                            <h3 className={styles.location}>
                                {favorites[currentLocationIndex].name}
                            </h3>
                            <h3 className={styles.day_time}>
                                <span className={styles.day}>{dag},</span>{" "}
                                <span className={styles.time}>
                                    {formattedTime}
                                </span>
                            </h3>
                            <div className={styles.extra_info}>
                                <WeatherIcon
                                    status={
                                        weatherQueries[currentLocationIndex]
                                            .data?.properties.timeseries[0].data
                                            .next_1_hours?.summary?.symbol_code
                                    }
                                    size={30}
                                />
                                <h4>
                                    {
                                        norwegianWeatherStatusMapping[
                                            weatherQueries[currentLocationIndex]
                                                .data?.properties.timeseries[0]
                                                .data.next_1_hours?.summary
                                                ?.symbol_code as WeatherStatus
                                        ]
                                    }
                                </h4>
                            </div>
                            <div className={styles.extra_info}>
                                <WeatherIcon status="rain" size={30} />
                                <h4>
                                    Nedbør -{" "}
                                    {
                                        weatherQueries[currentLocationIndex]
                                            .data?.properties.timeseries[0].data
                                            .next_6_hours?.details
                                            .precipitation_amount
                                    }
                                    mm
                                </h4>
                            </div>
                        </>
                    ) : (
                        <p className={styles.no_places}>
                            Du har ikke lagt til noen lokasjoner enda, søk på en
                            plass for å komme i gang!
                        </p>
                    )}
                </div>
                <div className={styles.favorites}>
                    <div className={styles.header}>
                        <p className={styles.container_title}>Dine plasser</p>
                        <Link to={url} className={styles.link}>
                            <p>
                                Se mer info{favorites.length != 0 && " for "}
                                {favorites.length != 0 &&
                                    favorites[currentLocationIndex].name}
                            </p>
                            <Icon icon="arrow-right" size={25} />
                        </Link>
                    </div>
                    <div className={styles.card_container}>
                        {favorites.map((location: Favorite, index: number) => (
                            <button
                                key={location.name}
                                onClick={() => setCurrentLocationIndex(index)}
                                className={styles.button}
                            >
                                <Card
                                    key={index}
                                    location={location.name}
                                    temperature={
                                        weatherQueries[index].data?.properties
                                            .timeseries[0].data.instant.details
                                            .air_temperature || 0
                                    }
                                    selected={currentLocationIndex == index}
                                    status={
                                        weatherQueries[index].data?.properties
                                            .timeseries[0].data.next_1_hours
                                            ?.summary?.symbol_code ||
                                        "clearsky_day"
                                    }
                                    next12hours={
                                        weatherQueries[index].data?.properties
                                            .timeseries[2].data.instant.details
                                            .air_temperature || 0
                                    }
                                />
                            </button>
                        ))}
                        {favorites.length == 0 && (
                            <p>Du har ikke lagt til noen lokasjoner enda</p>
                        )}
                    </div>
                    {favorites.length != 0 && (
                        <>
                            <h3 className={styles.title}>
                                Høydepunkter for{" "}
                                {favorites[currentLocationIndex].name}
                            </h3>
                            <div className={styles.card_container}>
                                <UVCard
                                    UVindex={
                                        weatherQueries[currentLocationIndex]
                                            .data?.properties.timeseries[0].data
                                            .instant.details
                                            .ultraviolet_index_clear_sky
                                    }
                                />
                                <WindCard
                                    WindSpeed={
                                        weatherQueries[currentLocationIndex]
                                            .data?.properties.timeseries[0].data
                                            .instant.details.wind_speed
                                    }
                                    WindGust={
                                        weatherQueries[currentLocationIndex]
                                            .data?.properties.timeseries[0].data
                                            .instant.details.wind_speed_of_gust
                                    }
                                    WindDirection={
                                        weatherQueries[currentLocationIndex]
                                            .data?.properties.timeseries[0].data
                                            .instant.details.wind_from_direction
                                    }
                                />
                                <HumidityCard
                                    humidity={
                                        (
                                            100 -
                                            weatherQueries[currentLocationIndex]
                                                .data?.properties.timeseries[0]
                                                .data.instant.details
                                                .relative_humidity
                                        ).toPrecision(3) as unknown as number
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>
            </main>
        </>
    );
};

export default HomePage;
