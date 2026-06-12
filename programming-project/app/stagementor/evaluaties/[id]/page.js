"use client";

import { useState } from "react";
import Topbar from "../../component/topbar";

const NIVEAUS = [
  { score: 1, label: "Onvoldoende", kleur: "#dc2626" },
  { score: 2, label: "In ontwikkeling", kleur: "#3b82f6" },
  { score: 3, label: "Voldoende", kleur: "#16a34a" },
  { score: 4, label: "Sterk", kleur: "#1e3a5f" },
];

const COMPETENTIES = [
  "D1. De lerende professional beheerst het volledige project- of operationeel planningsproces",
  "D2. De lerende professional ontwerpt IT-oplossingen volgens de industriestandaarden",
  "D3. De lerende professional implementeert digitale producten in een professionele omgeving",
  "D4. De lerende professional integreert technologie en infrastructuur binnen een professionele omgeving",
  "D5. De lerende professional hanteert een onderzoekende houding om tot innovatieve oplossingen te komen",
  "D6. De lerende professional communiceert helder en transparant in een professionele omgeving en/of in teamverband",
  "D7. De lerende professional denkt kritisch na om problemen efficiënt en effectief op te lossen",
  "D8. De lerende professional ziet persoonlijke ontwikkeling als de basis voor professionele groei",
  "D9. De lerende professional ontwikkelt een professionele attitude en handelt kwaliteitsvol",
  "D10. De lerende professional demonstreert ondernemend handelen in functie van waardecreatie",
  "D11. De lerende professional handelt ethisch en deontologisch",
];

export default function EvaluatieDetailPage() {
  const [tab, setTab] = useState("tussentijds");

  const [commentaren, setCommentaren] = useState(COMPETENTIES.map(() => ""));

  const [scores, setScores] = useState(COMPETENTIES.map(() => null));

  const updateScore = (index, score) => {
    const copy = [...scores];
    copy[index] = score;
    setScores(copy);
  };

  const updateCommentaar = (index, value) => {
    const copy = [...commentaren];
    copy[index] = value;
    setCommentaren(copy);
  };

  const handleAnnuleren = () => {
    setScores(COMPETENTIES.map(() => null));
    setCommentaren(COMPETENTIES.map(() => ""));
  };

  return (
    <div>
      <Topbar
        title="Bilal Jaaboub — Tussentijdse evaluatie"
        backHref="/stagementor/evaluaties"
        backLabel="Evaluaties"
      />

      <div className="p-6 flex flex-col gap-4">
        {/* TABS */}
        <div className="flex gap-6 border-b border-gray-200">
          <button
            onClick={() => setTab("tussentijds")}
            className={`pb-2 text-sm font-medium ${
              tab === "tussentijds"
                ? "text-gray-900 border-b-2 border-[#1e3a5f]"
                : "text-gray-400"
            }`}
          >
            Tussentijds
          </button>

          <button
            onClick={() => setTab("finaal")}
            className={`pb-2 text-sm font-medium ${
              tab === "finaal"
                ? "text-gray-900 border-b-2 border-[#1e3a5f]"
                : "text-gray-400"
            }`}
          >
            Finaal
          </button>
        </div>

        {tab === "tussentijds" ? (
          <>
            {/* RUBRIEK */}
            <div className="flex items-center gap-5 flex-wrap">
              <span className="text-xs font-semibold text-gray-500">
                Rubriek:
              </span>

              {NIVEAUS.map((n) => (
                <div key={n.score} className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: n.kleur }}
                  >
                    {n.score}
                  </span>

                  <span className="text-xs text-gray-500">{n.label}</span>
                </div>
              ))}
            </div>

            {/* COMPETENTIES */}
            <div className="flex flex-col gap-4">
              {COMPETENTIES.map((competentie, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md bg-white overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-4 p-4">
                    <p className="text-sm text-gray-700 max-w-4xl">
                      {competentie}
                    </p>

                    <div className="flex gap-2 shrink-0">
                      {NIVEAUS.map((niveau) => {
                        const selected = scores[index] === niveau.score;

                        return (
                          <button
                            key={niveau.score}
                            onClick={() => updateScore(index, niveau.score)}
                            className={`w-8 h-8 rounded-full text-xs font-semibold border transition ${
                              selected
                                ? "text-white border-transparent"
                                : "bg-white text-gray-500 border-gray-300"
                            }`}
                            style={
                              selected
                                ? {
                                    backgroundColor: niveau.kleur,
                                  }
                                : {}
                            }
                          >
                            {niveau.score}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 bg-white p-3">
                    <textarea
                      rows={3}
                      value={commentaren[index]}
                      onChange={(e) => updateCommentaar(index, e.target.value)}
                      placeholder="Schrijf je commentaar hier..."
                      className="w-full bg-transparent resize-none outline-none text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Finale evaluatie is nog niet beschikbaar
            </h2>

            <p className="mt-4 text-gray-600">Openingsdatum:</p>

            <p className="font-semibold text-[#1e3a5f] mt-1">15/06/2026</p>

            <p className="text-sm text-gray-500 mt-4">
              Je kan de finale evaluatie invullen vanaf deze datum.
            </p>
          </div>
        )}
      </div>

      {tab === "tussentijds" && (
        <div className="flex justify-end gap-3 mt-8 pt-4 pr-6 pb-6 border-t border-gray-200">
          <button
            onClick={handleAnnuleren}
            className="px-5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
          >
            Annuleren
          </button>

          <button className="px-5 py-2.5 bg-[#1e3a5f] text-white rounded-md text-sm hover:opacity-90">
            Evaluatie opslaan
          </button>
        </div>
      )}
    </div>
  );
}
