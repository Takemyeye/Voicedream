import dotenv from 'dotenv';

dotenv.config();

const NARATOR = process.env.NARATORE_DEFFAULT || "FC4lzTEy6X4ezRs3sokM";

type ParserEntry = {
    character: string;
    line: string;
  };
  
  type Voice = {
    characterName: string;
    voiceId: string;
  };
  
  export class VoiceIdUpdater {
    private voices: Voice[];
  
    constructor(voices: Voice[]) {
      this.voices = voices;
    }
  
    public updateParserWithVoiceIds(parser: ParserEntry[]): ParserEntry[] {
      return parser.map(entry => {
        const matchingVoice = this.voices.find(voice => voice.characterName === entry.character);
        if (matchingVoice) {
          entry.character = matchingVoice.voiceId;
        } else {
          entry.character = NARATOR; 
        }
        return entry;
      });
    }
  }
  