export const separateStory = (story: string): { character: string, line: string }[] => {
  const lines = story.split('\n').map(line => line.trim()).filter(line => line !== '');
  const dialogues: { character: string, line: string }[] = [];

  let currentCharacter = '';

  lines.forEach(line => {
    const match = line.match(/^([A-Za-zÀ-ÖØ-öø-ÿ]+):/);
    if (match) {
      currentCharacter = match[1];
      const dialogueLine = line.replace(`${currentCharacter}:`, '').trim();

      if (dialogueLine) {
        dialogues.push({ character: currentCharacter, line: dialogueLine });
      }
    } else if (currentCharacter) {
      dialogues.push({ character: currentCharacter, line: line });
    }
  });

  return dialogues;
};
