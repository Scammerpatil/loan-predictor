import { IconMoon, IconSun } from "@tabler/icons-react";

const ThemeController = () => {
  return (
    <div className="btn btn-ghost mx-2">
      <label className="swap swap-rotate">
        <input type="checkbox" className="theme-controller" value="night" />

        {/* sun icon */}
        <IconSun className="swap-off" size={30} />
        {/* Moon Icon */}
        <IconMoon className="swap-on" size={30} />
      </label>
    </div>
  );
};

export default ThemeController;
