import s from "./AppShell.module.css";
import Card from "../Card/Card.jsx";
import Table from "../Table/Table.jsx";

export default function AppShell(){
  return (
    <div className={s.app}>
      
        {/* This is for the sidebar */}
      <aside className={s.sidebar}>
        {/*Sidebar Tittle*/}
        <div className={s.sideTitle}>Quick Links</div>
        
        {/*Sub Links to click*/}
        <nav className={s.nav}>
          <a href="#">Allergies</a>
          <a href="#">Bloodwork</a>
          <a href="#">Medications</a>
          <a href="#">Other</a>
        </nav>

      </aside>

      <main className={s.main}>
        <header className={s.pagebar}>
          <h1 className={s.logo}>MediBase</h1>
          <input className={s.search} placeholder="Search records…" />
         {/*<button className="button primary">+ Add record</button>*/}
        </header>
        <section className={s.welcomeSection}>
          <div className={s.welcomeText}>
            <h2>Welcome, user!</h2>
            <p className={s.welcomeSub}>Nice to see you! Here are a few quick actions to get started.</p>
          </div>

          <div className={s.welcomeActions}>
            <button className="button primary">✚ Get started</button>
          </div>
        </section>

        <section className={s.cards}>
          <Card title="Check what's next" items={["Check Calendar","Immunizations","Scheduled Procedures"]}/>
          <Card title="Insurance Records" items={["Providers","Records"]}/>
          <Card title="Your Info" items={["Profile","Edit Info","Convert to PDF"]}/>
        </section>
        

        

        <section className={s.block}>
          <h3>Recent Records</h3>
        </section>
      </main>
    </div>
  );
}
