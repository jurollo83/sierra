// Address Script for Signal Real Estate
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Only run if URL ends with 'more'
        if (!window.location.href.endsWith('more')) return;
        
        // Function to extract and format address from URL
        function getAddressFromUrl() {
            const path = window.location.pathname;
            const segments = path.split('/');
            const addressSegment = segments.find(seg => seg.includes('-ma-'));
            if (!addressSegment) return null;
            
            const parts = addressSegment.split('-ma-');
            if (parts.length !== 2) return null;
            
            const streetParts = parts[0].split('-');
            const streetAddress = streetParts
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
                
            const state = 'MA';
            const zip = parts[1];
            
            const city = streetParts[streetParts.length - 1];
            const cityFormatted = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
            
            return `${streetAddress} ${cityFormatted} ${state} ${zip}`;
        }
        
        // Function to add address to the heading
        function addAddressToHeading() {
            setTimeout(() => {
                const h2Elements = document.getElementsByTagName('h2');
                let headingElement = null;
                for (let h2 of h2Elements) {
                    if (h2.textContent.includes('Hi-Res Photos')) {
                        headingElement = h2;
                        break;
                    }
                }
                
                if (!headingElement) return;
                
                const address = getAddressFromUrl();
                if (!address) return;
                
                headingElement.innerHTML += `<br><h3 style="margin-top: 10px;">${address}</h3>`;
                
                const wellElement = document.querySelector('.content__main .well');
                if (wellElement) {
                    wellElement.style.opacity = '0.85';
                }
            }, 500);
        }
        
        // Run the function
        addAddressToHeading();
    });
})();
