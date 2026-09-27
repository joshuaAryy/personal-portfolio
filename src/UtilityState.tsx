import { useId } from "react";
import { Link } from "react-router-dom";
import "./utility.css";

export type UtilityStateVariant = "empty" | "unavailable" | "offline";
export type UtilityStateRoute =
  | "/projects"
  | "/experience"
  | "/profile"
  | "/profile/demos";

export type UtilityStateProps = {
  variant: UtilityStateVariant;
  message: string;
  title?: string;
  action?: {
    to: UtilityStateRoute;
    label: string;
  };
};

const defaultTitle: Record<UtilityStateVariant, string> = {
  empty: "Nothing to show here yet",
  unavailable: "This content is unavailable",
  offline: "You’re offline",
};

export function UtilityState({
  variant,
  title = defaultTitle[variant],
  message,
  action,
}: UtilityStateProps) {
  const titleId = useId();

  return (
    <section
      className={`utility-state utility-state--${variant}`}
      aria-labelledby={titleId}
    >
      <span className="utility-state__icon" aria-hidden="true">
        ?
      </span>
      <div className="utility-state__body">
        <p className="utility-eyebrow">
          Shared state · {variant}
        </p>
        <h2 id={titleId}>{title}</h2>
        <p className="utility-state__message">{message}</p>
        {action && (
          <Link className="utility-state__action" to={action.to}>
            {action.label} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </section>
  );
}

export default UtilityState;
