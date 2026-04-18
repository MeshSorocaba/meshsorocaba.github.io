/**
 * Generate 3-letter abbreviation for Brazilian city names
 * Based on the algorithm from: https://pt.stackoverflow.com/questions/309628/
 * 
 * Algorithm priorities:
 * 1. First letter: initial of first word
 * 2. Second letter: initial of second word (or next available from first word)
 * 3. Third letter: initial of last word (or next available from first/second words)
 */

function normalizeCityName(name) {
    if (!name || typeof name !== 'string') {
        return '';
    }
    
    // Remove accents, convert to uppercase, split by space/hyphen/apostrophe
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .replace(/'/g, ' ')  // Treat apostrophes as separators
        .split(/[\s\-]+/)    // Split by spaces or hyphens
        .filter(part => part.length > 0);
}

function getConsonants(word) {
    // Extract only consonants (useful for fallbacks)
    return word.replace(/[^A-Z]/g, '');
}

function generateCityAbbreviation(cityName, usedAbbreviations = new Set()) {
    if (!cityName || typeof cityName !== 'string') {
        return '';
    }
    
    const normalized = normalizeCityName(cityName);
    if (normalized.length === 0) {
        return '';
    }
    
    // Handle empty result from normalization
    const parts = normalized;
    if (parts.length === 0) {
        return '';
    }
    
    /**
     * Try to generate abbreviation using the SO algorithm logic
     * Returns candidate abbreviation or null if failed
     */
    function tryGenerate(c1Pos, c1WordIdx, c2Pos, c2WordIdx, c3Pos, c3WordIdx) {
        const c1 = parts[c1WordIdx]?.[c1Pos];
        const c2 = parts[c2WordIdx]?.[c2Pos];
        const c3 = parts[c3WordIdx]?.[c3Pos];
        
        if (!c1 || !c2 || !c3) return null;
        
        const abbrev = c1 + c2 + c3;
        
        // Check for collision if we have a usedAbbreviations set
        if (usedAbbreviations.size > 0 && usedAbbreviations.has(abbrev)) {
            return null;
        }
        
        return abbrev;
    }
    
    /**
     * Get a letter at position pos from word at wordIdx, with fallback positions
     */
    function getLetterWithFallback(wordIdx, startPos) {
        if (wordIdx >= parts.length) return null;
        const word = parts[wordIdx];
        if (startPos >= word.length) return null;
        return word[startPos];
    }
    
    // Try multiple abbreviation strategies
    const strategies = [];
    
    // Strategy 1: First letter from first word, second from second word, third from last word
    if (parts.length >= 1 && parts[0].length > 0) {
        // First letter from first word, position 0
        strategies.push({ c1WordIdx: 0, c1Pos: 0 });
    }
    if (parts.length >= 2 && parts[1].length > 0) {
        // Second letter from second word, position 0
        strategies.push({ c2WordIdx: 1, c2Pos: 0 });
    }
    // Third letter from last word, position 0
    if (parts.length >= 1) {
        strategies.push({ c3WordIdx: parts.length - 1, c3Pos: 0 });
    }
    
    // Generate abbreviation using the algorithm
    let abbreviation = null;
    
    // Try different combinations based on the SO algorithm
    // 1. Try initials: first letter from word i, second from word k, third from word m (last)
    for (let i = 0; i < parts.length && !abbreviation; i++) {
        for (let j = 0; j < parts[i].length && !abbreviation; j++) {
            const letter1 = parts[i][j];
            
            // Second letter from next words
            for (let k = i + 1; k < parts.length && !abbreviation; k++) {
                for (let l = 0; l < parts[k].length && !abbreviation; l++) {
                    const letter2 = parts[k][l];
                    
                    // Third letter from last word
                    for (let m = parts.length - 1; m >= k && !abbreviation; m--) {
                        for (let n = 0; n < parts[m].length && !abbreviation; n++) {
                            const letter3 = parts[m][n];
                            const candidate = letter1 + letter2 + letter3;
                            
                            if (!usedAbbreviations.has(candidate)) {
                                abbreviation = candidate;
                                break;
                            }
                        }
                        
                        // If not found, try other positions in word k after position l
                        if (!abbreviation) {
                            for (let n = l + 1; n < parts[k].length && !abbreviation; n++) {
                                const candidate = letter1 + letter2 + parts[k][n];
                                if (!usedAbbreviations.has(candidate)) {
                                    abbreviation = candidate;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            
            // If not found, try second letter from same first word
            if (!abbreviation) {
                for (let l = j + 1; l < parts[i].length && !abbreviation; l++) {
                    // Prefer consecutive letters
                    if (l + 1 < parts[i].length) {
                        const candidate = letter1 + parts[i][l] + parts[i][l + 1];
                        if (!usedAbbreviations.has(candidate)) {
                            abbreviation = candidate;
                            break;
                        }
                    }
                    
                    // Try with reverse traversal for third letter
                    for (let n = parts[i].length - 1; n >= 0 && !abbreviation; n--) {
                        if (n !== j && n !== l) {
                            const candidate = letter1 + parts[i][l] + parts[i][n];
                            if (!usedAbbreviations.has(candidate)) {
                                abbreviation = candidate;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    
    // Fallback: just use first 3 letters (or consonants)
    if (!abbreviation) {
        const firstWord = parts[0];
        const consonants = getConsonants(firstWord);
        
        if (consonants.length >= 3) {
            abbreviation = consonants.substring(0, 3);
        } else {
            // Use first 3 letters of cleaned name
            const letters = firstWord.replace(/[^A-Z]/g, '');
            abbreviation = letters.substring(0, 3);
        }
        
        // If still in collision, add a distinguishing suffix
        if (usedAbbreviations.has(abbreviation)) {
            const secondWord = parts.length > 1 ? parts[1] : '';
            if (secondWord.length > 0) {
                const candidate = abbreviation[0] + secondWord[0] + (consonants[1] || firstWord[1]);
                if (!usedAbbreviations.has(candidate)) {
                    abbreviation = candidate;
                }
            }
        }
    }
    
    return abbreviation || '???';
}

/**
 * Get city abbreviation with automatic collision handling
 * Main entry point for the repeater name generator
 */
function getCityAbbreviation(cityName, usedAbbreviations = new Set()) {
    const normalized = cityName?.trim();
    if (!normalized) {
        return '';
    }
    
    const abbreviation = generateCityAbbreviation(normalized, usedAbbreviations);
    
    return abbreviation;
}

/**
 * Form handling code
 */
document.addEventListener('DOMContentLoaded', function() {
    const cityNameInput = document.getElementById('city-name');
    const cityAbbreviation = document.getElementById('city-abbreviation');
    const regionalIdInput = document.getElementById('regional-id');
    const pubkeyInput = document.getElementById('pubkey');
    const generateBtn = document.getElementById('generate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');
    const errorMessage = document.getElementById('error-message');
    const resultBox = document.getElementById('result');
    const generatedName = document.getElementById('generated-name');

    // Update abbreviation as user types city name
    cityNameInput.addEventListener('input', function() {
        const city = this.value.trim();
        if (city) {
            const abbrev = getCityAbbreviation(city);
            cityAbbreviation.textContent = abbrev;
        } else {
            cityAbbreviation.textContent = '---';
        }
        hideError();
        hideResult();
    });

    // Also update on regional and pubkey input changes
    regionalIdInput.addEventListener('input', hideError);
    pubkeyInput.addEventListener('input', function() {
        // Auto-convert to uppercase
        this.value = this.value.toUpperCase();
        hideError();
    });

    // Generate button click handler
    generateBtn.addEventListener('click', function() {
        const city = cityNameInput.value.trim();
        const regional = regionalIdInput.value.trim();
        const pubkey = pubkeyInput.value.trim();

        // Validate inputs
        if (!city) {
            showError('Por favor, informe o nome da cidade.');
            cityNameInput.focus();
            return;
        }

        if (!regional) {
            showError('Por favor, informe o identificador regional.');
            regionalIdInput.focus();
            return;
        }

        if (!pubkey) {
            showError('Por favor, informe a public key.');
            pubkeyInput.focus();
            return;
        }

        if (pubkey.length !== 4) {
            showError('A public key deve ter exatamente 4 caracteres.');
            pubkeyInput.focus();
            return;
        }

        if (!/^[a-f0-9]{4}$/i.test(pubkey)) {
            showError('A public key deve conter apenas caracteres hexadecimais (a-f, 0-9).');
            pubkeyInput.focus();
            return;
        }

        // Generate the name
        const abbrev = getCityAbbreviation(city);
        const cleanRegional = regional
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s\-]/g, '')
            .toUpperCase()
            .split(/[\s\-]+/)
            .filter(word => word.length > 0)
            .join('');
        const cleanPubkey = pubkey.toUpperCase();

        const fullName = `${abbrev}-${cleanRegional}-${cleanPubkey}`;
        
        generatedName.textContent = fullName;
        showResult();
        hideError();
    });

    // Reset button click handler
    resetBtn.addEventListener('click', function() {
        cityNameInput.value = '';
        regionalIdInput.value = '';
        pubkeyInput.value = '';
        cityAbbreviation.textContent = '---';
        hideError();
        hideResult();
        cityNameInput.focus();
    });

    // Copy button click handler
    copyBtn.addEventListener('click', function() {
        const name = generatedName.textContent;
        navigator.clipboard.writeText(name).then(function() {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copiado!';
            setTimeout(function() {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(function() {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = name;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copiado!';
            setTimeout(function() {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    function showResult() {
        resultBox.style.display = 'block';
    }

    function hideResult() {
        resultBox.style.display = 'none';
    }
});