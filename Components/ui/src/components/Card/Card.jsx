import s from "./Card.module.css";
export default function Card({title, items=[], className, style}){
  return (
    <article className={`${s.card} ${className ?? ""}`} style={style}>
      <div className={s.title}>{title}</div>
      <ul>{items.map((t,i)=>(<li key={i}><a href="#">{t}</a></li>))}</ul>
    </article>
  );
}