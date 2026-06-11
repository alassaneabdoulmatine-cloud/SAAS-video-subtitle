export interface StylizedWord {
    text: string;
    start: number; // en secondes
    end: number;   // en secondes
    emoji: string | null;
    color: string; // Ex: '#FFFFFF', '#FFFF00', '#FF0000'
}