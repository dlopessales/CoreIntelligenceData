/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmpreendimentoComponentsPage from './empreendimento.page-object';
import { EmpreendimentoDeleteDialog } from './empreendimento.page-object';
import EmpreendimentoUpdatePage from './empreendimento-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Empreendimento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let empreendimentoUpdatePage: EmpreendimentoUpdatePage;
  let empreendimentoComponentsPage: EmpreendimentoComponentsPage;
  let empreendimentoDeleteDialog: EmpreendimentoDeleteDialog;

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

  it('should load Empreendimentos', async () => {
    await navBarPage.getEntityPage('empreendimento');
    empreendimentoComponentsPage = new EmpreendimentoComponentsPage();
    expect(await empreendimentoComponentsPage.getTitle().getText()).to.match(/Empreendimentos/);
  });

  it('should load create Empreendimento page', async () => {
    await empreendimentoComponentsPage.clickOnCreateButton();
    empreendimentoUpdatePage = new EmpreendimentoUpdatePage();
    expect(await empreendimentoUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /coreIntelligenceDataApp.empreendimento.home.createOrEditLabel/
    );
    await empreendimentoUpdatePage.cancel();
  });

  it('should create and save Empreendimentos', async () => {
    async function createEmpreendimento() {
      await empreendimentoComponentsPage.clickOnCreateButton();
      await empreendimentoUpdatePage.setNomeInput('nome');
      expect(await empreendimentoUpdatePage.getNomeInput()).to.match(/nome/);
      await empreendimentoUpdatePage.setRuaInput('rua');
      expect(await empreendimentoUpdatePage.getRuaInput()).to.match(/rua/);
      await empreendimentoUpdatePage.setNumeroInput('5');
      expect(await empreendimentoUpdatePage.getNumeroInput()).to.eq('5');
      await empreendimentoUpdatePage.setBairroInput('bairro');
      expect(await empreendimentoUpdatePage.getBairroInput()).to.match(/bairro/);
      await empreendimentoUpdatePage.setCidadeInput('cidade');
      expect(await empreendimentoUpdatePage.getCidadeInput()).to.match(/cidade/);
      await empreendimentoUpdatePage.setConstrutoraEmpreendedoraInput('construtoraEmpreendedora');
      expect(await empreendimentoUpdatePage.getConstrutoraEmpreendedoraInput()).to.match(/construtoraEmpreendedora/);
      await empreendimentoUpdatePage.setQuantidadeQuartosInput('5');
      expect(await empreendimentoUpdatePage.getQuantidadeQuartosInput()).to.eq('5');
      await empreendimentoUpdatePage.setInicioComercializacaoInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await empreendimentoUpdatePage.getInicioComercializacaoInput()).to.contain('2001-01-01T02:30');
      await empreendimentoUpdatePage.setEntregaUnidadeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await empreendimentoUpdatePage.getEntregaUnidadeInput()).to.contain('2001-01-01T02:30');
      await empreendimentoUpdatePage.faseObraSelectLastOption();
      await empreendimentoUpdatePage.tipoUnidadeSelectLastOption();
      await empreendimentoUpdatePage.setQuantidadeUnidadesInput('5');
      expect(await empreendimentoUpdatePage.getQuantidadeUnidadesInput()).to.eq('5');
      await empreendimentoUpdatePage.setQuantidadeUnidadesVendidasInput('5');
      expect(await empreendimentoUpdatePage.getQuantidadeUnidadesVendidasInput()).to.eq('5');
      await empreendimentoUpdatePage.setEstoqueInput('5');
      expect(await empreendimentoUpdatePage.getEstoqueInput()).to.eq('5');
      await empreendimentoUpdatePage.setPercentualVendidoInput('5');
      expect(await empreendimentoUpdatePage.getPercentualVendidoInput()).to.eq('5');
      await empreendimentoUpdatePage.setPrecoMedioInput('5');
      expect(await empreendimentoUpdatePage.getPrecoMedioInput()).to.eq('5');
      await empreendimentoUpdatePage.setAreaUnidadeInput('5');
      expect(await empreendimentoUpdatePage.getAreaUnidadeInput()).to.eq('5');
      await empreendimentoUpdatePage.setFormaPagamentoInput('formaPagamento');
      expect(await empreendimentoUpdatePage.getFormaPagamentoInput()).to.match(/formaPagamento/);
      await empreendimentoUpdatePage.setCaracterizacaoAreaLazerInput('caracterizacaoAreaLazer');
      expect(await empreendimentoUpdatePage.getCaracterizacaoAreaLazerInput()).to.match(/caracterizacaoAreaLazer/);
      await empreendimentoUpdatePage.setInfrestruturaSegurancaInput('infrestruturaSeguranca');
      expect(await empreendimentoUpdatePage.getInfrestruturaSegurancaInput()).to.match(/infrestruturaSeguranca/);
      await empreendimentoUpdatePage.setNivelAcabamentoInput('nivelAcabamento');
      expect(await empreendimentoUpdatePage.getNivelAcabamentoInput()).to.match(/nivelAcabamento/);
      await empreendimentoUpdatePage.levantamentoSelectLastOption();
      await waitUntilDisplayed(empreendimentoUpdatePage.getSaveButton());
      await empreendimentoUpdatePage.save();
      await waitUntilHidden(empreendimentoUpdatePage.getSaveButton());
      expect(await empreendimentoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEmpreendimento();
    await empreendimentoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await empreendimentoComponentsPage.countDeleteButtons();
    await createEmpreendimento();

    await empreendimentoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await empreendimentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Empreendimento', async () => {
    await empreendimentoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await empreendimentoComponentsPage.countDeleteButtons();
    await empreendimentoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    empreendimentoDeleteDialog = new EmpreendimentoDeleteDialog();
    expect(await empreendimentoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /coreIntelligenceDataApp.empreendimento.delete.question/
    );
    await empreendimentoDeleteDialog.clickOnConfirmButton();

    await empreendimentoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await empreendimentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
