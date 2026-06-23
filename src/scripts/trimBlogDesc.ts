export default function trimBlogDesc(desc: string, maxLen: number = 150) {
  // Trim any trailing whitespace
  const trimmed = desc.trimEnd();

  // Return empty string if no description provided
  if (!trimmed) {
    return "";
  }

  // Return full string if within maxLen
  if (trimmed.length < maxLen) {
    return trimmed;
  }

  // Slice description to max length
  var shortDesc = desc.slice(0, Math.min(maxLen, desc.length));

  // Remove any lingering punctuation

  if (shortDesc.length < desc.length) {
    shortDesc = shortDesc.slice(0, shortDesc.lastIndexOf(" ")) + "...";
  }

  while (!/[a-zA-Z]/.test(shortDesc.slice(-1)) && shortDesc.length > 0) {
    shortDesc = shortDesc.slice(0, shortDesc.length - 1);
  }

  return shortDesc + "...";
}
