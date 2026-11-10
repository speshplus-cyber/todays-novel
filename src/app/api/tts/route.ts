import { NextRequest, NextResponse } from 'next/server';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const VOICE_PROFILES: Record<
  string,
  { voiceId: string; pitch: string; label: string }
> = {
  marcus: {
    voiceId: 'en-US-BrianNeural',
    pitch: '-2Hz',
    label: 'Marcus (25 • US African-American • Soulful & Sincere)'
  },
  darius: {
    voiceId: 'en-US-AndrewNeural',
    pitch: '-3Hz',
    label: 'Darius (25 • US African-American • Warm Baritone)'
  },
  malik: {
    voiceId: 'en-US-GuyNeural',
    pitch: '-2Hz',
    label: 'Malik (26 • US African-American • Dramatic Storyteller)'
  }
};

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function synthesizeAudio(
  text: string,
  profileKey: string,
  rateMultiplier: number
): Promise<Buffer> {
  const profile = VOICE_PROFILES[profileKey] || VOICE_PROFILES.marcus;
  const tts = new MsEdgeTTS();
  await tts.setMetadata(
    profile.voiceId,
    OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3
  );

  // Convert numeric rate (e.g. 0.85, 1.0, 1.2, 1.5) to SSML percentage (e.g. "-15%", "+0%", "+20%")
  const rateDiff = Math.round((rateMultiplier - 1.0) * 100);
  const rateStr = rateDiff >= 0 ? `+${rateDiff}%` : `${rateDiff}%`;

  const cleanText = escapeXml(text.trim());
  const { audioStream } = tts.toStream(cleanText, {
    pitch: profile.pitch,
    rate: rateStr,
    volume: '+0%'
  });

  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const timeout = setTimeout(() => {
      try {
        tts.close();
      } catch {}
      reject(new Error('TTS synthesis timed out'));
    }, 15000);

    audioStream.on('data', (chunk: Buffer) => {
      chunks.push(Buffer.from(chunk));
    });

    audioStream.on('end', () => {
      clearTimeout(timeout);
      try {
        tts.close();
      } catch {}
      resolve(Buffer.concat(chunks));
    });

    audioStream.on('error', (err: Error) => {
      clearTimeout(timeout);
      try {
        tts.close();
      } catch {}
      reject(err);
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = String(body.text || '').trim();
    const voice = String(body.voice || 'marcus');
    const rate = Number(body.rate || 1.0);

    if (!text) {
      return NextResponse.json({ error: 'Missing text' }, { status: 400 });
    }

    const mp3Buffer = await synthesizeAudio(text, voice, rate);
    return new NextResponse(new Uint8Array(mp3Buffer), {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(mp3Buffer.length),
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (error) {
    console.error('Neural TTS error:', error);
    return NextResponse.json(
      { error: 'Failed to synthesize neural voice' },
      { status: 500 }
    );
  }
}
