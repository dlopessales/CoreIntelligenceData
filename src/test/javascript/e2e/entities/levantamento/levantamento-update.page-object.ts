import { element, by, ElementFinder } from 'protractor';

export default class LevantamentoUpdatePage {
  pageTitle: ElementFinder = element(by.id('coreIntelligenceDataApp.levantamento.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomeInput: ElementFinder = element(by.css('input#levantamento-nome'));
  descricaoInput: ElementFinder = element(by.css('input#levantamento-descricao'));
  dataCriacaoInput: ElementFinder = element(by.css('input#levantamento-dataCriacao'));
  usuarioCriacaoInput: ElementFinder = element(by.css('input#levantamento-usuarioCriacao'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomeInput(nome) {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput() {
    return this.nomeInput.getAttribute('value');
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return this.descricaoInput.getAttribute('value');
  }

  async setDataCriacaoInput(dataCriacao) {
    await this.dataCriacaoInput.sendKeys(dataCriacao);
  }

  async getDataCriacaoInput() {
    return this.dataCriacaoInput.getAttribute('value');
  }

  async setUsuarioCriacaoInput(usuarioCriacao) {
    await this.usuarioCriacaoInput.sendKeys(usuarioCriacao);
  }

  async getUsuarioCriacaoInput() {
    return this.usuarioCriacaoInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
