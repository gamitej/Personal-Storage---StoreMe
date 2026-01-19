import { ImageIcon, PdfIcon, TextIcon, ZipIcon } from "@/components/common/FileSvgIcons";

export interface SideBarLink {
  name: string;
  path: string;
}
export interface FileIconMap {
  [key: string]: string;
}

export const sideBarLinks: SideBarLink[] = [
  { name: 'My Drive', path: '/' },
  { name: 'Recent', path: '/recent' },
  { name: 'Photos', path: '/photos' },
  { name: 'Starred', path: '/starred' },
  { name: 'Shared with me', path: '/shared-with-me' },
  { name: 'Trash', path: '/trash' },
];

export const fileIcons: Record<string, React.FC<{ className?: string }>> = {
  "application/pdf": PdfIcon,
  "image/jpeg": ImageIcon,
  "image/png": ImageIcon,
  "image/webp": ImageIcon,
  "text/plain": TextIcon,
  "application/zip": ZipIcon,
  "application/x-zip-compressed": ZipIcon,
};

export const getIconColor = (mime: string) => {
  if (mime.includes("pdf")) return "text-red-300";
  if (mime.includes("image")) return "text-green-300";
  if (mime.includes("zip")) return "text-yellow-300";
  if (mime.includes("text")) return "text-blue-300";
  return "text-gray-300";
};


export const formatFileSize = (bytes: number) => {
  const kb = bytes / 1024;
  if (kb < 1000) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1000;
  if (mb < 1000) {
    return `${mb.toFixed(2)} MB`;
  }

  const gb = mb / 1000;
  return `${gb.toFixed(2)} GB`;
};
