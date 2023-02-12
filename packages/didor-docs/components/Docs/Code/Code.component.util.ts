export interface Record {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

/**
 * Returns an array with the lines between the start of the text and a position
 *
 * @param {string} value - The current value of the textarea
 * @param {number} position - The position of the caret
 * @returns {array} - An array of strings, each string is a line of text.
 */
function getLines(text: string, position: number): Array<string> {
  return text.substring(0, position).split('\n');
}

/**
 * Insert a tab character at the caret position
 *
 * The function takes in a string, the caret position, and the tab character to insert. It returns an
 * object with the updated string, and the updated caret position
 *
 * @param {string} value - The current value of the textarea
 * @param {number} selectionStart - The index of the caret position
 * @param {string} tabCharacter - The tab character to insert at the caret
 * @returns Returns an object with the updated caret text and selection
 */
function increaseTab(value: string, selectionStart: number, tabCharacter: string): Record {
  const updatedSelection = selectionStart + tabCharacter.length;

  // Insert tab character at caret
  const updateValue = value.substring(0, selectionStart) + tabCharacter + value.substring(selectionStart);

  // Update caret position
  const updateSelectionStart = updatedSelection;
  const updateSelectionEnd = updatedSelection;

  return {
    value: updateValue,
    selectionStart: updateSelectionStart,
    selectionEnd: updateSelectionEnd
  };
}

/**
 * Remove tab character at caret position
 *
 * @param {string} value - The current value of the textarea
 * @param {number} selectionStart - The index of the caret position
 * @param {string} tabCharacter - The character that is used to indent the code
 * @returns Returns an object with the updated caret text and selection
 */
function decreaseTab(value: string, selectionStart: number, tabCharacter: string): Record {
  const updatedSelection = selectionStart - tabCharacter.length;

  // Remove tab character at caret
  const updateValue = value.substring(0, selectionStart - tabCharacter.length) + value.substring(selectionStart);

  // Update caret position
  const updateSelectionStart = updatedSelection;
  const updateSelectionEnd = updatedSelection;

  return {
    value: updateValue,
    selectionStart: updateSelectionStart,
    selectionEnd: updateSelectionEnd
  }
}

/**
 * Insert a tab character to selected lines
 *
 * @param {string} value - The current value of the textarea
 * @param {number} selectionStart - The index of the first character in the selection
 * @param {number} selectionEnd - The index of the last character in the selection
 * @param {string} tabCharacter - The character that is used to indent the code
 * @param {Function} getLines - Function - a function that returns an array with the lines between the start of the text and a position
 * @returns Returns an object with the updated caret text and selection
 */
function increaseSelectionTab(value: string, selectionStart: number, selectionEnd: number, tabCharacter: string, getLines: Function): Record {
  const linesBeforeCaret = getLines(value, selectionStart);
  const startLine = linesBeforeCaret.length - 1;
  const endLine = getLines(value, selectionEnd).length - 1;
  const startLineText = linesBeforeCaret[startLine];

  // Insert tab character to selected lines
  const updateValue = value
    .split('\n')
    .map((line, i) => {
      if (i >= startLine && i <= endLine) {
        return tabCharacter + line;
      }

      return line;
    })
    .join('\n')

  // Move the start cursor by number of characters added in first line of selection
  // Don't move it if it there was no text before cursor
  const updateSelectionStart = /\S/.test(startLineText) ? selectionStart + tabCharacter.length : selectionStart;

  // Move the end cursor by total number of characters added
  const updateSelectionEnd = selectionEnd + tabCharacter.length * (endLine - startLine + 1);

  // If the value is the same, return the original value
  if (value === updateValue) {
    return { value, selectionStart, selectionEnd }
  }

  return {
    value: updateValue,
    selectionStart: updateSelectionStart,
    selectionEnd: updateSelectionEnd
  };
}

/**
 * Remove a tab character to selected lines
 *
 * @param {string} value - The current value of the textarea
 * @param {number} selectionStart - The index of the first character in the selection
 * @param {number} selectionEnd - The index of the last character in the selection
 * @param {string} tabCharacter - The character that is used to indent the code
 * @param {Function} getLines - Function - a function that returns an array with the lines between the start of the text and a position
 * @returns Returns an object with the updated caret text and selection
 */
function decreaseSelectionTab(value: string, selectionStart: number, selectionEnd: number, tabCharacter: string, getLines: Function): Record {
  const linesBeforeCaret = getLines(value, selectionStart);
  const startLine = linesBeforeCaret.length - 1;
  const endLine = getLines(value, selectionEnd).length - 1;
  const startLineText = linesBeforeCaret[startLine];

  // Remove tab character to selected lines
  const updateValue = value
    .split('\n')
    .map((line, i) => {
      if (i >= startLine && i <= endLine && line.startsWith(tabCharacter)) {
        return line.substring(tabCharacter.length);
      }

      return line;
    })
    .join('\n');

  // Move the start cursor if first line in selection was modified
  // It was modified only if it started with a tab
  const updateSelectionStart = startLineText.startsWith(tabCharacter)
    ? selectionStart - tabCharacter.length
    : selectionStart;

  // Move the end cursor by total number of characters removed
  const updateSelectionEnd = selectionEnd - (value.length - updateValue.length);

  return {
    value: updateValue,
    selectionStart: updateSelectionStart,
    selectionEnd: updateSelectionEnd
  };
}

/**
 * Preserve indentation on inserting a new line
 *
 * @param {string} value - The current value of the textarea
 * @param {number} selectionStart - The index of the caret position
 * @param {string} initIndent - The initial space that is used to indent the code
 * @returns Returns an object with the updated caret text and selection
 */
function tabNewLine(value: string, selectionStart: number, initIndent: string): Record {
  // Preserve indentation on inserting a new line
  const indent = '\n' + initIndent;
  const updatedSelection = selectionStart + indent.length;

  // Insert new line and indentation character at caret
  const updateValue = value.substring(0, selectionStart) + indent + value.substring(selectionStart);

  // Update caret position
  const updateSelectionStart = updatedSelection;
  const updateSelectionEnd = updatedSelection;

  return {
    value: updateValue,
    selectionStart: updateSelectionStart,
    selectionEnd: updateSelectionEnd
  };
}

function getHightlightLines(lines: string, maxLines: number): number[] {
  if (!lines) return []

  const linesList = lines.split(',')
    .reduce((lines: number[], line: string) => {
      if (line.includes('-')) {
        const [start, end] = line.split('-')
        const startNumber = parseInt(start)
        const endNumber = parseInt(end)
        const range = Array.from({ length: endNumber - startNumber + 1 }, (_, i) => i + startNumber)
        lines = [...lines, ...range]
        return lines
      }

      lines.push(parseInt(line))
      return lines
    }, [])
    // Remove lines that are greater than the number of lines in the editor
    .filter((line: number) => line <= maxLines)
    .sort((a, b) => a - b)

  // Remove duplicates
  return [...new Set(linesList)]
}

export { increaseTab, decreaseTab, increaseSelectionTab, decreaseSelectionTab, tabNewLine, getLines, getHightlightLines }
