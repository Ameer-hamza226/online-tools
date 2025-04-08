import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder - Free Online Tool',
  description: 'Free online tool to encode and decode text to and from Base64 format. No ads, no registration, and completely free.',
  keywords: ['base64', 'encoder', 'decoder', 'base64 converter', 'online tool', 'free tool'],
};

export default function Base64Layout({ children }: { children: React.ReactNode }) {
  return children;
}
