/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PremissaComponentsPage from './premissa.page-object';
import { PremissaDeleteDialog } from './premissa.page-object';
import PremissaUpdatePage from './premissa-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Premissa e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let premissaUpdatePage: PremissaUpdatePage;
  let premissaComponentsPage: PremissaComponentsPage;
  let premissaDeleteDialog: PremissaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Premissas', async () => {
    await navBarPage.getEntityPage('premissa');
    premissaComponentsPage = new PremissaComponentsPage();
    expect(await premissaComponentsPage.getTitle().getText()).to.match(/Premissas/);
  });

  it('should load create Premissa page', async () => {
    await premissaComponentsPage.clickOnCreateButton();
    premissaUpdatePage = new PremissaUpdatePage();
    expect(await premissaUpdatePage.getPageTitle().getAttribute('id')).to.match(/coreIntelligenceDataApp.premissa.home.createOrEditLabel/);
    await premissaUpdatePage.cancel();
  });

  it('should create and save Premissas', async () => {
    async function createPremissa() {
      await premissaComponentsPage.clickOnCreateButton();
      await premissaUpdatePage.setDescricaoInput('descricao');
      expect(await premissaUpdatePage.getDescricaoInput()).to.match(/descricao/);
      await premissaUpdatePage.levantamentoSelectLastOption();
      await waitUntilDisplayed(premissaUpdatePage.getSaveButton());
      await premissaUpdatePage.save();
      await waitUntilHidden(premissaUpdatePage.getSaveButton());
      expect(await premissaUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createPremissa();
    await premissaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await premissaComponentsPage.countDeleteButtons();
    await createPremissa();

    await premissaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await premissaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Premissa', async () => {
    await premissaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await premissaComponentsPage.countDeleteButtons();
    await premissaComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    premissaDeleteDialog = new PremissaDeleteDialog();
    expect(await premissaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/coreIntelligenceDataApp.premissa.delete.question/);
    await premissaDeleteDialog.clickOnConfirmButton();

    await premissaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await premissaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
