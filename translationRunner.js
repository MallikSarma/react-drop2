import manageTranslations from "react-intl-translations-manager";

manageTranslations({
  messagesDirectory: "./src/messages/en-US/",
  translationsDirectory: "./src/messages/translations/en-US/",
  languages: ["en-US"],
  singleMessagesFile: true,
});