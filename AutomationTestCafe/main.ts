import { Selector, ClientFunction  } from 'testcafe'; // import testcafe selectors
import { Config } from './config/config';
//import { Config } from './config/config'

// declare the fixture
fixture `Google`.page `http://www.google.cl`;  // declare the start page

//declare actions to execute 
test('Google Automation', async t => {
    await Find(t);
    await FindProduct(t);
    await SelectProduct(t);
    await BasketCart(t);
});
//------------------------------------Functions------------------------------------------------
/**
 * @param t 
 */
async function Find(t:TestController){
    //Selectors
    const inputSearch = Selector('#lst-ib');
    const btnSearch = Selector('#tsf > div.tsf-p > div.jsb > center > input[type="submit"]:nth-child(1)');
    const link = Selector(".LC20lb");
    const linkPortal = Selector('#rso > div:nth-child(1) > div > div > div > div > div.r > a > h3');
     //Operation
    await t.typeText(inputSearch, "Falabella.com - Mejor Compra Online").click(btnSearch);//Falabella.com - Mejor Compra Online
    await t.expect(await Selector('.LC20lb').textContent).contains('Falabella.com - Mejor Compra Online');
    await t.click(linkPortal);    //await t.wait(3000).click(linkPortal);    
    }

async function FindProduct(t:TestController){
     //Selectors
     const inputSearchProduct = Selector(id => document.getElementById('searchQuestionSolr'));
        
     await t.typeText(inputSearchProduct, 'PS4')
        .expect(inputSearchProduct.value).eql('PS4')     
        .pressKey('enter');
            
    }

async function SelectProduct(t:TestController){
     //Selectors
    const linkProduct = Selector('.pod-head__image');
    const btnAddproductToCart = Selector('#fbra_browseMainProduct > div > div > div.fb-product-cta > div > div.fb-product-cta__controls.clearboth > div > div.fb-product-cta__controls--actions.fb-product-cta__controls--actions-pdp > button');
    const btnClose = Selector (id => document.getElementById('fbra_browseMainProduct'));
    const btnBasket = Selector ('#header > nav > div.fb-masthead__util-bar > div > div.fb-masthead__util-bar__util-wrapper > div.fb-masthead-item__main.fb-masthead-basket > div > a > span');
    let popoup_btn_no = Selector('#acc-alert-deny');
    //eval btnVerBolsaCompra = Selector(".fb-added-to-basket__ctas").child(0);
        await t.click(linkProduct)
        .click(popoup_btn_no)
        .click(btnAddproductToCart)    
        .click(Selector("#search-bar"))
        .click(btnBasket);
}
async function BasketCart(t:TestController){
    //selectors 
    const basketProduct = Selector (id => document.getElementById('fb-basket-products'));
    const btnAddUnit = Selector('.fb-quantity-input__plus').withText('+');//('#fb-basket-products > div.fb-basket-product-list > section > section > form > section > div.fb-product-item__quantity > div > button.fb-quantity-input__plus');
    const cmbGuaranteeSelect = Selector ('#fb-basket-products > div.fb-basket-product-list > section > section > section > div > div > div > div > form > div');
    const cmbGuaranteeSelectChild    = cmbGuaranteeSelect.child('.fb-inline-dropdown__list-item');
    const linkProduct = Selector ('#fb-basket-products > div.fb-basket-product-list > section > section > section > div > div > div > div > form > div > div > ul > li:nth-child(3) > a'); 
    const btnGoToBuy = Selector ('body > div.site-wrapper > main > div > div.fb-basket__order-container > div.fb-basket__order-container__summary > div > div.fb-order-status > form > div:nth-child(4) > div.fb-order-status__cta-group > div.fb-order-status__cta > button');
    let ul = Selector('.fb-inline-dropdown__list');
    let li = ul.find('li');
   /* var focus = ClientFunction(() => {
        document.getElementsByClassName('fb-inline-dropdown__list').focus();
    });*/
    await  t.click(btnAddUnit)
            .click(basketProduct)
            .click(cmbGuaranteeSelect)
            .click(li.find('a').withText('49.190'))
            .click(btnGoToBuy);
}