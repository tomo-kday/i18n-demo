import { i18n } from "../i18n-config";

export function getSubdomainFromUrl(url : string) {

  // Split the hostname by periods (.)
  const hostnameParts = url.split('.');

  // Check if there is a subdomain (at least 3 parts) and the first part is not "www" (default language)
  if (hostnameParts?.length <= 1) {
    return i18n.defaultLocale
  }
  if (hostnameParts[0] !== 'www') {
    // Extract and return the subdomain (first part)
    return hostnameParts[0];
  } else {
    // No subdomain found or default language selected
    return hostnameParts[1];
  }
}
