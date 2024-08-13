export interface CommandCode {
    id: number;
    name: string;
    command: string;
    class: string;
    triggers: string[];
    description: string;
    example?: string; // optional
    icon?: JSX.Element; // optional
    shortDescription?: string; // optional
}