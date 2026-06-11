export default function DocentPage() {
  return (
    <main className="page">
      <section className="card">

        <div className="brand">
          <div className="logo">C</div>
          <span className="brand-name">Competent</span>
        </div>

        <h1>Wachtwoord instellen</h1>

        <p className="subtitle">
          Stel uw wachtwoord in om toegang te krijgen
        </p>

        <form>
          <label>Ontvangen code</label>
          <input
            type="text"
            placeholder="Code uit uw uitnodigingsmail"
          />

          <label>Nieuw wachtwoord</label>
          <input
            type="password"
            placeholder="Kies een wachtwoord"
          />

          <label>Bevestig wachtwoord</label>
          <input
            type="password"
            placeholder="Herhaal uw wachtwoord"
          />

          <button type="submit">
            Bevestigen →
          </button>
        </form>

      </section>
    </main>
  );
}