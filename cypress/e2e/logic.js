function script() {
    
    let debug = true

        var doc;
        var iframe = document.querySelector('iframe.aut-iframe'); // Adjust the selector as needed
        
        if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
            doc = iframe.contentWindow.document;
        } else {
            doc = document; // Fallback to the main document if iframe is not accessible
        }
        
        function injectPricePerUnit( priceItem, pricePerUnit ) {
            
            let dataLabelAttribute = 'pricePerUnit';
            let pricePerUnitDiv = priceItem.querySelector(`div[data-label="${dataLabelAttribute}"]`);
          
            if (pricePerUnitDiv) {
              pricePerUnitDiv.textContent = `${pricePerUnit}`;
            } else {
              pricePerUnitDiv = doc.createElement('div');
              pricePerUnitDiv.setAttribute('data-label', dataLabelAttribute);
              pricePerUnitDiv.textContent = `${pricePerUnit}`;
              priceItem.appendChild(pricePerUnitDiv);
            };
            
        };
        
        let unitFactorMap = {
                "l|L|litros?|LITROS?|Litros?": 1,
                "ml": 0.001,
                "kg|kilos?" : 1,
                "g": 0.001,
                "mgs?": 0.000001,
                "pza?s?|Piezas?|pastillas?|bolsas?|rollos?|hojas?":1
        };
        
        function parseQuantityAmountUnit(ItemDescriptionBeforeParsingData) {
        
        
            const unitPattern = Object.keys(unitFactorMap).join('|');
            const regexPattern = new RegExp(
                `(\\d (?:\\.\\d )?)\\s*(${unitPattern})`
            );
            const match = [...ItemDescriptionBeforeParsingData.matchAll(
                new RegExp(regexPattern, 'g')
            )];
        
            if(debug){ 
                console.group(
                    regexPattern,
                    match,
                    match.length ); 
            }
        
            
            let amount;
            let quantity;
            let unit;
        
        
            
          switch (true) {
        
                
                  
            case match.length == 1:
        
                
                let [ , quantity, unit] = match[0];
        
                amount = findFactorByExactMatch( unitFactorMap, unit )
        
                if( quantity == undefined || unit == undefined ){
                    throw new Error(
                        "On case '1' quantity or unit 'undefinied'"
                    );
                }
                
                  
                quantity = parseFloat(quantity )
        
                return [quantity * amount , 1 , unit]   
                break;
        
            case match.length == 2:
        
        
                let [ , quantityA, unitA] = match[0];
                let [, quantityB, unitB] = match[1];
        
                  
                amount = findFactorByExactMatch( unitFactorMap, unitB )
        
                  
                  
                if( quantityA == undefined || unitA == undefined || quantityB == undefined || unitB == undefined ){
                    throw new Error(
                        "On case '2' quantities or units 'undefinied'"
                    );
                }  
                
                quantityA = parseFloat( quantityA )
                quantityB = parseFloat( quantityB )
        
                if(debug){
                   console.log(quantityA, unitA, quantityB, unitB, "amount: ", amount ) 
                }
                  
                return [quantityB * amount, quantityA, unitB]
                break;
            
            default:
        
                   throw new Error("Unsupported input");
                  
          } 
        
        }
        
        
        function getPricePerUnit( priceContainer ) {
            
        
            let priceItemSelector = '[data-automation-id="product-price"]';
            let amountItemSelector = '[data-automation-id="product-title"]';
            let price = priceContainer.querySelector(priceItemSelector).innerText.match(/\d /)[0];
            let ItemDescriptionBeforeParsingData = priceContainer.querySelector(amountItemSelector).innerText;
        
        
            let [amount, quantity, unit] = parseQuantityAmountUnit(ItemDescriptionBeforeParsingData);
        
            let totalQuantity = amount * quantity;
            let pricePerUnit = parseFloat( (price / totalQuantity).toFixed(2) ) ;
        
            if(debug){
                
                console.groupEnd(
                `Info: ${ItemDescriptionBeforeParsingData},
            price: ${price}, amount: ${amount}, quantity: ${quantity}, unit: ${unit}, totalQuantity: ${totalQuantity}, pricePerUnit: ${pricePerUnit}`);
            }    
            
            return pricePerUnit;
        };
           
        ( function (){
            
            let bestPricePerUnit = 1000;
            let worstPricePerUnit = 0;
            let bestProduct, worstProduct;
            
                
            [...doc
             .querySelectorAll('div[data-testid][class=""]')
            ].forEach(priceContainer => {
            
                try {
                
                    let pricePerUnit = getPricePerUnit( priceContainer );
                    
                    if(pricePerUnit < bestPricePerUnit && pricePerUnit !== 0){
                        bestPricePerUnit = pricePerUnit;
                        bestProduct = priceContainer;
                    } 
            
                    if(pricePerUnit > worstPricePerUnit && pricePerUnit !== 0){
                        worstPricePerUnit = pricePerUnit;
                        worstProduct = priceContainer;
                    } 
            
                    if (typeof pricePerUnit == "number") {
                      injectPricePerUnit( priceContainer, pricePerUnit );
                    } 
                    
                } catch (err) {
            
                    changeBorderColor( priceContainer, 'blue');
            
                    console.log( err );
                    
                };
                  
            });
            
            
            changeBorderColor( bestProduct, 'green');
            
            scrollToElement( bestProduct );
            
            changeBorderColor( worstProduct, 'red');
        })()
        
        
        //
        // Utils
        //
        
        function scrollToElement(element) {
        
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth', 
              block: 'start',     // 'start', 'center', 'end', or 'nearest'
              inline: 'center'  // 'start', 'center', 'end', or 'nearest'
            });
          }
        }
        
        function findFactorByExactMatch(map, input ) {
        
            if(debug){
                console.log("map, input: ",map, input)
            }
            
            for (const key in map) {
                
                const variations = key.split("|");
                
                if (variations.some(variation => variation.replaceAll("?", "") === input)) {
                    return map[key];
                }
            }
            return null; 
        }
        
        
        function changeBorderColor(
            element,
            color,
            opacity = 0.75,
            borderWidth = '4px',
            borderStyle = 'solid'
        ) {
            
          const colorMap = {
            green: `rgba(0, 128, 0, ${opacity})`,
            yellow: `rgba(255, 255, 0, ${opacity})`,
            blue: `rgba(0, 0, 255, ${opacity})`,
            red: `rgba(255, 0, 0, ${opacity})`,
            // Add more colors here as needed
          };
        
          const borderColor = colorMap[color];
        
          if (borderColor) {
            if(element){  
            element.style = `border: ${borderWidth} ${borderStyle} ${borderColor};`;
            }
          } else {
            console.warn(
                'Invalid color provided. Supported colors:',
                Object.keys(colorMap).join(', ')
            );
          }
        }

}

// To make this function available to other scripts or Cypress specs
window.script = script;