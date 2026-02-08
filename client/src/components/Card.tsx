export interface CardProps {
  image?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  image,
  title,
  description,
  children,
  className,
  onClick,
}: CardProps) {
  return (
    <div
      className={`card ${className || ""}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {description && <p className="card-desc">{description}</p>}
        {children}
      </div>
    </div>
  );
}
