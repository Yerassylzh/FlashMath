import humanizeDuration from "humanize-duration";

export function formatSeconds(seconds, lang = "ru") {
  return humanizeDuration(seconds / 1000, {
    language: lang,
    units: ["h", "m", "s"],
    largest: 2,
    round: true,
    delimiter: " ",
    spacer: " ",
    conjunction: "",
  });
}
