/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LevantamentoComponentsPage from './levantamento.page-object';
import { LevantamentoDeleteDialog } from './levantamento.page-object';
import LevantamentoUpdatePage from './levantamento-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Levantamento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let levantamentoUpdatePage: LevantamentoUpdatePage;
  let levantamentoComponentsPage: LevantamentoComponentsPage;
  let levantamentoDeleteDialog: LevantamentoDeleteDialog;

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

  it('should load Levantamentos', async () => {
    await navBarPage.getEntityPage('levantamento');
    levantamentoComponentsPage = new LevantamentoComponentsPage();
    expect(await levantamentoComponentsPage.getTitle().getText()).to.match(/Levantamentos/);
  });

  it('should load create Levantamento page', async () => {
    await levantamentoComponentsPage.clickOnCreateButton();
    levantamentoUpdatePage = new LevantamentoUpdatePage();
    expect(await levantamentoUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /coreIntelligenceDataApp.levantamento.home.createOrEditLabel/
    );
    await levantamentoUpdatePage.cancel();
  });

  it('should create and save Levantamentos', async () => {
    async function createLevantamento() {
      await levantamentoComponentsPage.clickOnCreateButton();
      await levantamentoUpdatePage.setNomeInput('nome');
      expect(await levantamentoUpdatePage.getNomeInput()).to.match(/nome/);
      await levantamentoUpdatePage.setDescricaoInput('descricao');
      expect(await levantamentoUpdatePage.getDescricaoInput()).to.match(/descricao/);
      await levantamentoUpdatePage.setDataCriacaoInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await levantamentoUpdatePage.getDataCriacaoInput()).to.contain('2001-01-01T02:30');
      await levantamentoUpdatePage.setUsuarioCriacaoInput('usuarioCriacao');
      expect(await levantamentoUpdatePage.getUsuarioCriacaoInput()).to.match(/usuarioCriacao/);
      await waitUntilDisplayed(levantamentoUpdatePage.getSaveButton());
      await levantamentoUpdatePage.save();
      await waitUntilHidden(levantamentoUpdatePage.getSaveButton());
      expect(await levantamentoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createLevantamento();
    await levantamentoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await levantamentoComponentsPage.countDeleteButtons();
    await createLevantamento();

    await levantamentoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await levantamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Levantamento', async () => {
    await levantamentoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await levantamentoComponentsPage.countDeleteButtons();
    await levantamentoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    levantamentoDeleteDialog = new LevantamentoDeleteDialog();
    expect(await levantamentoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /coreIntelligenceDataApp.levantamento.delete.question/
    );
    await levantamentoDeleteDialog.clickOnConfirmButton();

    await levantamentoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await levantamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
