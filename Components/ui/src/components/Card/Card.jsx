import s from "./Card.module.css";
export default function Card({title, items=[]}){
  return (
    <article className={s.card}>
      <div className={s.title}>{title}</div>
      <ul>{items.map((t,i)=>(<li key={i}><a href="#">{t}</a></li>))}</ul>
    </article>
  );
}