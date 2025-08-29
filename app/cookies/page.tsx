import { Footer } from "@/components/client-page"
import { SharedHeader } from "@/components/shared-header"

export default function CookiesPolicyPage() {
  return (
    <div className="bg-white min-h-screen font-sans flex flex-col">
      <SharedHeader />
      <main className="flex-1 flex items-center justify-center px-8 py-24">
        <div className="w-full max-w-3xl text-left space-y-8">
          <h1 className="text-4xl font-bold mt-20 mb-4">Zásady používania súborov cookies</h1>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Čo sú cookies?</h2>
            <p>
              Cookies sú malé textové súbory, ktoré sa ukladajú vo Vašom zariadení (počítač, tablet, smartfón) pri návšteve webových stránok. Umožňujú stránke zapamätať si Vaše úkony a preferencie (napr. prihlasovacie údaje, jazyk, veľkosť písma a iné nastavenia) na určitý čas, takže ich nemusíte zadávať opakovane pri každej návšteve alebo prehliadaní jednotlivých stránok.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Prečo používame cookies?</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Na zabezpečenie správneho fungovania našej webovej stránky.</li>
              <li>Na zapamätanie si Vašich preferencií a nastavení.</li>
              <li>Na analýzu návštevnosti a zlepšovanie našich služieb.</li>
              <li>Na personalizáciu obsahu a reklám podľa Vašich záujmov.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Typy cookies, ktoré používame</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Nevyhnutné cookies:</strong> Sú potrebné na základné fungovanie stránky a nemožno ich vypnúť.</li>
              <li><strong>Funkčné cookies:</strong> Umožňujú stránke zapamätať si Vaše voľby a zlepšujú používateľský komfort.</li>
              <li><strong>Analytické cookies:</strong> Pomáhajú nám pochopiť, ako návštevníci používajú našu stránku, aby sme ju mohli vylepšovať.</li>
              <li><strong>Marketingové cookies:</strong> Slúžia na zobrazovanie relevantných reklám a sledovanie efektivity reklamných kampaní.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Ako môžete spravovať cookies?</h2>
            <p>
              Väčšina internetových prehliadačov automaticky prijíma cookies. Nastavenia prehliadača však môžete upraviť tak, aby ste cookies odmietli alebo aby ste boli upozornení, keď sa cookies odosielajú. Ak sa rozhodnete cookies zablokovať, niektoré časti našej stránky nemusia fungovať správne.
            </p>
            <p>
              Podrobné informácie o správe cookies nájdete v nápovede Vášho prehliadača alebo na stránkach:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Safari</li>
              <li>Microsoft Edge</li>
              <li>Android</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Vaše práva</h2>
            <p>
              Máte právo kedykoľvek odvolať svoj súhlas s používaním cookies, zmeniť nastavenia cookies alebo požiadať o vymazanie už uložených cookies. Ak máte otázky ohľadom spracúvania cookies, kontaktujte nás na <a href="mailto:innomenstudio@gmail.com" className="text-blue-600 underline">innomenstudio@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Zmeny zásad používania cookies</h2>
            <p>
              Tieto zásady môžeme z času na čas aktualizovať. Odporúčame Vám pravidelne si prečítať túto stránku, aby ste boli informovaní o prípadných zmenách.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
} 