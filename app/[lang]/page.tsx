import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import { getSubdomainFromUrl } from "../../utils/get-subdomain-url";
import Counter from "./components/counter";
import LocaleSwitcher from "./components/locale-switcher";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // console.log("🚀 ~ file: page.tsx:12 ~ lang:", lang);
  // or change the key of dictionary.
  const selectedLang = getSubdomainFromUrl(lang);
  // console.log("🚀 ~ file: page.tsx:14 ~ selectedLang:", selectedLang);
  const dictionary = await getDictionary(selectedLang as Locale, "footer");
  console.log("🚀 ~ file: page.tsx:16 ~ dictionary:", dictionary);
  // const dictionary = await getDictionary(lang);
  // console.log("🚀 ~ file: page.tsx:13 ~ lang:", lang);
  // const headersList = headers();
  // console.log("🚀 ~ file: page.tsx:14 ~ headersList:", headersList.host);
  return (
    <div>
      <LocaleSwitcher />
      <p>Current locale: {selectedLang}</p>
      <p>
        This text is rendered on the server:
        {dictionary["server-component"].welcome}
      </p>
      <Counter dictionary={dictionary.counter} />
    </div>
  );
}
