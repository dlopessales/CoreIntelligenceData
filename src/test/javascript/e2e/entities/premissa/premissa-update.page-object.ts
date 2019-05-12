import { element, by, ElementFinder } from 'protractor';

export default class PremissaUpdatePage {
  pageTitle: ElementFinder = element(by.id('coreIntelligenceDataApp.premissa.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descricaoInput: ElementFinder = element(by.css('input#premissa-descricao'));
  levantamentoSelect: ElementFinder = element(by.css('select#premissa-levantamento'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return this.descricaoInput.getAttribute('value');
  }

  async levantamentoSelectLastOption() {
    await this.levantamentoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async levantamentoSelectOption(option) {
    await this.levantamentoSelect.sendKeys(option);
  }

  getLevantamentoSelect() {
    return this.levantamentoSelect;
  }

  async getLevantamentoSelectedOption() {
    return this.levantamentoSelect.element(by.css('option:checked')).getText();
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
