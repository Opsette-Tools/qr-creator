import { Button } from '@/components/ui/button';
import { Download, Copy, BookmarkPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { QRConfig } from '@/types/qr';

function isValidUrl(str: string): boolean {
  try { new URL(str); return true; } catch { return false; }
}

interface Props {
  config: QRConfig;
  onSave: () => void;
}

export function QRActions({ config, onSave }: Props) {
  const disabled = !isValidUrl(config.url);

  const handlePng = async () => {
    await (window as any).__qrDownload?.png();
    toast({ title: 'PNG downloaded!' });
  };

  const handleSvg = async () => {
    await (window as any).__qrDownload?.svg();
    toast({ title: 'SVG downloaded!' });
  };

  const handleCopy = async () => {
    try {
      const blob = await (window as any).__qrDownload?.blob();
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        toast({ title: 'Copied to clipboard!' });
      }
    } catch {
      toast({ title: 'Copy failed', description: 'Your browser may not support this.', variant: 'destructive' });
    }
  };

  const handleSave = () => {
    onSave();
    toast({ title: 'Saved to library!' });
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <Button disabled={disabled} onClick={handlePng} size="sm" className="h-10 text-xs font-medium rounded-xl shadow-sm active:scale-[0.97] active:shadow-none transition-all">
        <Download className="mr-1.5 h-3.5 w-3.5" /> PNG
      </Button>
      <Button disabled={disabled} onClick={handleSvg} size="sm" className="h-10 text-xs font-medium rounded-xl shadow-sm active:scale-[0.97] active:shadow-none transition-all">
        <Download className="mr-1.5 h-3.5 w-3.5" /> SVG
      </Button>
      <Button disabled={disabled} onClick={handleCopy} variant="outline" size="sm" className="h-10 text-xs font-medium rounded-xl shadow-sm active:scale-[0.97] active:shadow-none transition-all">
        <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
      </Button>
      <Button disabled={disabled} onClick={handleSave} variant="secondary" size="sm" className="h-10 text-xs font-medium rounded-xl shadow-sm active:scale-[0.97] active:shadow-none transition-all">
        <BookmarkPlus className="mr-1.5 h-3.5 w-3.5" /> Save
      </Button>
    </div>
  );
}
