export interface SideBarLink {
  name: string;
  path: string;
}

export const sideBarLinks: SideBarLink[] = [
  { name: 'My Drive', path: '/' },
  { name: 'Recent', path: '/recent' },
  { name: 'Photos', path: '/photos' },
  { name: 'Starred', path: '/starred' },
  { name: 'Shared with me', path: '/shared-with-me' },
  { name: 'Trash', path: '/trash' },
];
