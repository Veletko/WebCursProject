export function initAccessibilityModal() {
    const baseFontSize = parseInt(getComputedStyle(document.documentElement).fontSize) || 16;
    let currentFontSize = baseFontSize;
    
    const setupAccessibility = () => {
        document.querySelector('.visually-impaired-button')?.addEventListener('click', openModal);
        
        document.querySelector('.mobile-menu .visually-impaired-button')?.addEventListener('click', openModal);
    
        document.getElementById('close-accessibility-modal')?.addEventListener('click', closeModal);
        
        document.querySelectorAll('.font-size-buttons button').forEach(button => {
            button.addEventListener('click', function() {
                setFontSize(this.dataset.fontSize);
            });
        });

        document.querySelectorAll('.color-scheme-buttons button').forEach(button => {
            button.addEventListener('click', function() {
                setColorScheme(this.dataset.scheme);
            });
        });

        document.getElementById('toggle-images')?.addEventListener('click', toggleImages);
        
        document.getElementById('reset-accessibility')?.addEventListener('click', resetSettings);
    };

    const openModal = () => {
        document.getElementById('accessibility-modal').style.display = 'flex';
    };

    const closeModal = () => {
        document.getElementById('accessibility-modal').style.display = 'none';
    };

    const setFontSize = (size) => {
        document.querySelector('.font-size-buttons button.active')?.classList.remove('active');
        document.querySelector(`.font-size-buttons button[data-font-size="${size}"]`).classList.add('active');
        
        switch(size) {
            case 'small':
                currentFontSize = baseFontSize - 2;
                break;
            case 'medium':
                currentFontSize = baseFontSize;
                break;
            case 'large':
                currentFontSize = baseFontSize + 2;
                break;
        }
        
        document.documentElement.style.fontSize = `${currentFontSize}px`;
    };

    const setColorScheme = (scheme) => {
        document.querySelector('.color-scheme-buttons button.active')?.classList.remove('active');
        document.querySelector(`.color-scheme-buttons button[data-scheme="${scheme}"]`).classList.add('active');
        
        document.body.classList.remove(
            'color-scheme-dark-white',
            'color-scheme-dark-green',
            'color-scheme-white-black',
            'color-scheme-beige-brown',
            'color-scheme-blue-darkblue'
        );
        document.body.classList.add(`color-scheme-${scheme}`);
    };

    const toggleImages = () => {
        document.body.classList.toggle('images-disabled');
        
        if (document.body.classList.contains('images-disabled')) {
            document.querySelectorAll('img[alt]').forEach(img => {
                const altText = document.createElement('div');
                altText.className = 'image-alt-text';
                altText.textContent = img.alt;
                img.parentNode.insertBefore(altText, img.nextSibling);
            });
        } else {
            document.querySelectorAll('.image-alt-text').forEach(el => el.remove());
        }
    };

    const resetSettings = () => {
        document.documentElement.style.fontSize = '';
        currentFontSize = baseFontSize;
        
        document.querySelectorAll('.font-size-buttons button.active, .color-scheme-buttons button.active').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector('.font-size-buttons button[data-font-size="medium"]').classList.add('active');
        document.querySelector('.color-scheme-buttons button[data-scheme="white-black"]').classList.add('active');
        
        document.body.classList.remove(
            'color-scheme-dark-white',
            'color-scheme-dark-green',
            'color-scheme-white-black',
            'color-scheme-beige-brown',
            'color-scheme-blue-darkblue',
            'images-disabled'
        );
        
        document.querySelectorAll('.image-alt-text').forEach(el => el.remove());
    };

    setupAccessibility();
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                setupAccessibility();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}