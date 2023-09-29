import * as Localization from "expo-localization";
import i18n from "i18n-js";

import en, { Translations } from "./en";
import nl from "./nl";
import de from "./de";

i18n.fallbacks = true;
i18n.translations = { en, "en-US": en, "en-GB": en, nl, de };
i18n.locale = Localization.locale;

export type TxKeyPath = RecursiveKeyOf<Translations>;

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;

export { i18n };
