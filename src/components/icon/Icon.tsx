export type IconType = "search" | "arrow-right";

interface IconProps {
    icon: IconType;
    size?: number;
}

const Icon = ({ icon, size = 24 }: IconProps) => {
    const iconSrc = `../public/icons/${icon}.svg`;
    return (
        <img
            src={iconSrc}
            alt="WeatherStatus"
            width={size}
            height={size}
            style={{ margin: "0px" }}
        />
    );
};

export default Icon;
