import clsx from "clsx";

export function SlideWrapper({ index, active, children }) {
  return (
    <div
      className={clsx(
        "absolute w-full transition-all duration-300",
        active === index ? "opacity-100 delay-75" : "opacity-0 pointer-events-none", active === index ? "transform-none": !active > index? "-transform-x-24":"transform-x-24",
      )}
    >
      {children}
    </div>
  );
}


