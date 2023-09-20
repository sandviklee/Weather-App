import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./../style/Home.module.css";
import Card from "../components/card/Card";
import Field from "../components/input/field/Field";
import WeatherIcon from "../components/icon/WeatherIcon";
import Icon from "../components/icon/Icon";
import Selector from "../components/input/selector/Selector";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface PlaceSearchInterface {
  name: string;
  municipality: string;
  county: string;
}

const PlaceSearch = ({ name, municipality, county }: PlaceSearchInterface) => {
  function capitalizeWords(input: string) {
    return input
      .split(" ") // Split by spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter and make the rest lowercase
      .join(" "); // Join back together
  }

  function unsamify(input: string) {
    return input.split("-")[0].trim(); // Split by "-" and take the first part, then trim any whitespace
  }

  return (
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
  );
};

const HomePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [fieldValue, setFieldValue] = useState<string>("");

  useEffect(() => {
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
  const formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions);

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
      koordsys: 4258;
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

  const favorites_test = ["Trondheim", "Oslo", "Fornebu", "Bergen"];

  localStorage.setItem("favorites", JSON.stringify(favorites_test));

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  const [currentLocation, setCurrentLocation] = useState<string | null>(
    favorites[0]
  );

  const { data, refetch } = useQuery({
    /**
     * @summary TanStack Query, fetches API from MET to data
     */
    queryKey: ["search", fieldValue],
    queryFn: () =>
      fetch(
        `https://ws.geonorge.no/stedsnavn/v1/sted?sok=${fieldValue}&fuzzy=true&utkoordsys=4258&treffPerSide=20&side=1`
      )
        .then((res) => res.json())
        .then((data) => {
          const resultsArray = data.navn; // Extracting the array from data.navn

          if (!Array.isArray(resultsArray)) {
            throw new Error("Expected an array in the API response");
          }

          // Filter out results where kommuner, fylker, or stedsnavn are empty or not defined
          const filteredData = resultsArray.filter((item: Plass) => {
            const hasKommuner = item.kommuner && item.kommuner.length > 0;
            const hasFylker = item.fylker && item.fylker.length > 0;
            const hasStedsnavn = item.stedsnavn && item.stedsnavn.length > 0;

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

  useEffect(() => {
    refetch();
    console.log(data);
    console.log(fieldValue);
  }, [fieldValue, refetch]);

  return (
    <>
      {fieldValue.length > 0 && (
        <div className={styles.search} onClick={() => setFieldValue("")}>
          <div className={styles.search_box}></div>
        </div>
      )}
      <div
        className={styles.input}
        style={
          fieldValue.length > 0
            ? {
                top: "200px",
                width: "80%",
                left: "10%",
              }
            : { padding: "0px" }
        }
      >
        <Field
          placeholder="Søk for områder"
          icon={"search"}
          value={fieldValue}
          setValue={setFieldValue}
        />
        {fieldValue.length > 0 && (
          <>
            <div className={styles.divider}></div>
            <div className={styles.places}>
              {data &&
                data.map((plass: Plass) => (
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
                  />
                ))}
            </div>
          </>
        )}
      </div>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.current_weather}>
            <WeatherIcon dayOrNight="day" status="sunny" size={120} />
          </div>
          <h3 className={styles.temperature}>15°C</h3>
          <h3 className={styles.location}>{currentLocation}</h3>
          <h3 className={styles.day_time}>
            <span className={styles.day}>{dag},</span>{" "}
            <span className={styles.time}>{formattedTime}</span>
          </h3>
          <div className={styles.extra_info}>
            <WeatherIcon dayOrNight="day" status="sunny" size={40} />
            <h4>Sol</h4>
          </div>
          <div className={styles.extra_info}>
            <WeatherIcon dayOrNight="neutral" status="rain" size={40} />
            <h4>Nedbør - 10mm</h4>
          </div>
          <div className={styles.link_container}>
            <Link to="/Weather/Trondheim" className={styles.link}>
              <p>Trykk her for å se mer info for {currentLocation}</p>
              <Icon icon="arrow-right" size={25} />
            </Link>
          </div>
        </div>
        <div className={styles.favorites}>
          <h3>Oversikt over dine plasser</h3>
          <Selector selections={["I dag", "I morgen"]} />
          <div className={styles.card_container}>
            {favorites.map((location: string, index: number) => (
              <button
                onClick={() => setCurrentLocation(location)}
                className={styles.button}
              >
                <Card
                  key={index}
                  location={location}
                  temperature={15}
                  selected={location == currentLocation}
                  nightTemperature={-3}
                />
              </button>
            ))}
          </div>
          <div className={styles.header}>
            <h3>
              Høydepunkter for{" "}
              <span style={{ textDecoration: "underline" }}>
                {currentLocation}
              </span>
            </h3>
            <Link to="/Weather/Trondheim" className={styles.link2}>
              <div className={styles.link2}>
                <p>Se mer info</p>
                <Icon icon="arrow-right" size={25} />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
