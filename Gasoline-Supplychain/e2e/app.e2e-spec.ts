/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for Gasoline-Supplychain', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be Gasoline-Supplychain', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('Gasoline-Supplychain');
    })
  });

  it('network-name should be gasoline-supplychain@0.1.2',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('gasoline-supplychain@0.1.2.bna');
    });
  });

  it('navbar-brand should be Gasoline-Supplychain',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('Gasoline-Supplychain');
    });
  });

  
    it('Gasoline component should be loadable',() => {
      page.navigateTo('/Gasoline');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Gasoline');
      });
    });

    it('Gasoline table should have 5 columns',() => {
      page.navigateTo('/Gasoline');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Refinery component should be loadable',() => {
      page.navigateTo('/Refinery');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Refinery');
      });
    });

    it('Refinery table should have 5 columns',() => {
      page.navigateTo('/Refinery');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Truck component should be loadable',() => {
      page.navigateTo('/Truck');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Truck');
      });
    });

    it('Truck table should have 8 columns',() => {
      page.navigateTo('/Truck');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Gasstation component should be loadable',() => {
      page.navigateTo('/Gasstation');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Gasstation');
      });
    });

    it('Gasstation table should have 5 columns',() => {
      page.navigateTo('/Gasstation');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Refine component should be loadable',() => {
      page.navigateTo('/Refine');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Refine');
      });
    });
  
    it('Load component should be loadable',() => {
      page.navigateTo('/Load');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Load');
      });
    });
  
    it('Unload component should be loadable',() => {
      page.navigateTo('/Unload');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Unload');
      });
    });
  
    it('Sell component should be loadable',() => {
      page.navigateTo('/Sell');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Sell');
      });
    });
  
    it('Historian component should be loadable',() => {
      page.navigateTo('/Historian');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Historian');
      });
    });
  

});