import s from "./Card.module.css";
export default function Card({title, items=[], className, style, children }){
  return (
    <article className={`${s.card} ${className ?? ""}`} style={style}>
      <div className={s.title}>{title}</div>
      {items?.length > 0 && (<ul>
        {items.map((t, i) => (
          <li key={i}><a href='#'>{t}</a></li>
        
        ))}
      
      </ul>)}
      {children}
    </article>
  );
}