import { classNames } from "src/utils/class-names";
export default function Container({ className, children }) {
  return (
    <div className={`container mx-auto ${classNames(className)}`}>
      {children}
    </div>
  );
}
