import { element, by, ElementFinder } from 'protractor';

export default class EmpreendimentoUpdatePage {
  pageTitle: ElementFinder = element(by.id('coreIntelligenceDataApp.empreendimento.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomeInput: ElementFinder = element(by.css('input#empreendimento-nome'));
  ruaInput: ElementFinder = element(by.css('input#empreendimento-rua'));
  numeroInput: ElementFinder = element(by.css('input#empreendimento-numero'));
  bairroInput: ElementFinder = element(by.css('input#empreendimento-bairro'));
  cidadeInput: ElementFinder = element(by.css('input#empreendimento-cidade'));
  construtoraEmpreendedoraInput: ElementFinder = element(by.css('input#empreendimento-construtoraEmpreendedora'));
  quantidadeQuartosInput: ElementFinder = element(by.css('input#empreendimento-quantidadeQuartos'));
  inicioComercializacaoInput: ElementFinder = element(by.css('input#empreendimento-inicioComercializacao'));
  entregaUnidadeInput: ElementFinder = element(by.css('input#empreendimento-entregaUnidade'));
  faseObraSelect: ElementFinder = element(by.css('select#empreendimento-faseObra'));
  tipoUnidadeSelect: ElementFinder = element(by.css('select#empreendimento-tipoUnidade'));
  quantidadeUnidadesInput: ElementFinder = element(by.css('input#empreendimento-quantidadeUnidades'));
  quantidadeUnidadesVendidasInput: ElementFinder = element(by.css('input#empreendimento-quantidadeUnidadesVendidas'));
  estoqueInput: ElementFinder = element(by.css('input#empreendimento-estoque'));
  percentualVendidoInput: ElementFinder = element(by.css('input#empreendimento-percentualVendido'));
  precoMedioInput: ElementFinder = element(by.css('input#empreendimento-precoMedio'));
  areaUnidadeInput: ElementFinder = element(by.css('input#empreendimento-areaUnidade'));
  formaPagamentoInput: ElementFinder = element(by.css('input#empreendimento-formaPagamento'));
  caracterizacaoAreaLazerInput: ElementFinder = element(by.css('input#empreendimento-caracterizacaoAreaLazer'));
  infrestruturaSegurancaInput: ElementFinder = element(by.css('input#empreendimento-infrestruturaSeguranca'));
  nivelAcabamentoInput: ElementFinder = element(by.css('input#empreendimento-nivelAcabamento'));
  levantamentoSelect: ElementFinder = element(by.css('select#empreendimento-levantamento'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomeInput(nome) {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput() {
    return this.nomeInput.getAttribute('value');
  }

  async setRuaInput(rua) {
    await this.ruaInput.sendKeys(rua);
  }

  async getRuaInput() {
    return this.ruaInput.getAttribute('value');
  }

  async setNumeroInput(numero) {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput() {
    return this.numeroInput.getAttribute('value');
  }

  async setBairroInput(bairro) {
    await this.bairroInput.sendKeys(bairro);
  }

  async getBairroInput() {
    return this.bairroInput.getAttribute('value');
  }

  async setCidadeInput(cidade) {
    await this.cidadeInput.sendKeys(cidade);
  }

  async getCidadeInput() {
    return this.cidadeInput.getAttribute('value');
  }

  async setConstrutoraEmpreendedoraInput(construtoraEmpreendedora) {
    await this.construtoraEmpreendedoraInput.sendKeys(construtoraEmpreendedora);
  }

  async getConstrutoraEmpreendedoraInput() {
    return this.construtoraEmpreendedoraInput.getAttribute('value');
  }

  async setQuantidadeQuartosInput(quantidadeQuartos) {
    await this.quantidadeQuartosInput.sendKeys(quantidadeQuartos);
  }

  async getQuantidadeQuartosInput() {
    return this.quantidadeQuartosInput.getAttribute('value');
  }

  async setInicioComercializacaoInput(inicioComercializacao) {
    await this.inicioComercializacaoInput.sendKeys(inicioComercializacao);
  }

  async getInicioComercializacaoInput() {
    return this.inicioComercializacaoInput.getAttribute('value');
  }

  async setEntregaUnidadeInput(entregaUnidade) {
    await this.entregaUnidadeInput.sendKeys(entregaUnidade);
  }

  async getEntregaUnidadeInput() {
    return this.entregaUnidadeInput.getAttribute('value');
  }

  async setFaseObraSelect(faseObra) {
    await this.faseObraSelect.sendKeys(faseObra);
  }

  async getFaseObraSelect() {
    return this.faseObraSelect.element(by.css('option:checked')).getText();
  }

  async faseObraSelectLastOption() {
    await this.faseObraSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setTipoUnidadeSelect(tipoUnidade) {
    await this.tipoUnidadeSelect.sendKeys(tipoUnidade);
  }

  async getTipoUnidadeSelect() {
    return this.tipoUnidadeSelect.element(by.css('option:checked')).getText();
  }

  async tipoUnidadeSelectLastOption() {
    await this.tipoUnidadeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setQuantidadeUnidadesInput(quantidadeUnidades) {
    await this.quantidadeUnidadesInput.sendKeys(quantidadeUnidades);
  }

  async getQuantidadeUnidadesInput() {
    return this.quantidadeUnidadesInput.getAttribute('value');
  }

  async setQuantidadeUnidadesVendidasInput(quantidadeUnidadesVendidas) {
    await this.quantidadeUnidadesVendidasInput.sendKeys(quantidadeUnidadesVendidas);
  }

  async getQuantidadeUnidadesVendidasInput() {
    return this.quantidadeUnidadesVendidasInput.getAttribute('value');
  }

  async setEstoqueInput(estoque) {
    await this.estoqueInput.sendKeys(estoque);
  }

  async getEstoqueInput() {
    return this.estoqueInput.getAttribute('value');
  }

  async setPercentualVendidoInput(percentualVendido) {
    await this.percentualVendidoInput.sendKeys(percentualVendido);
  }

  async getPercentualVendidoInput() {
    return this.percentualVendidoInput.getAttribute('value');
  }

  async setPrecoMedioInput(precoMedio) {
    await this.precoMedioInput.sendKeys(precoMedio);
  }

  async getPrecoMedioInput() {
    return this.precoMedioInput.getAttribute('value');
  }

  async setAreaUnidadeInput(areaUnidade) {
    await this.areaUnidadeInput.sendKeys(areaUnidade);
  }

  async getAreaUnidadeInput() {
    return this.areaUnidadeInput.getAttribute('value');
  }

  async setFormaPagamentoInput(formaPagamento) {
    await this.formaPagamentoInput.sendKeys(formaPagamento);
  }

  async getFormaPagamentoInput() {
    return this.formaPagamentoInput.getAttribute('value');
  }

  async setCaracterizacaoAreaLazerInput(caracterizacaoAreaLazer) {
    await this.caracterizacaoAreaLazerInput.sendKeys(caracterizacaoAreaLazer);
  }

  async getCaracterizacaoAreaLazerInput() {
    return this.caracterizacaoAreaLazerInput.getAttribute('value');
  }

  async setInfrestruturaSegurancaInput(infrestruturaSeguranca) {
    await this.infrestruturaSegurancaInput.sendKeys(infrestruturaSeguranca);
  }

  async getInfrestruturaSegurancaInput() {
    return this.infrestruturaSegurancaInput.getAttribute('value');
  }

  async setNivelAcabamentoInput(nivelAcabamento) {
    await this.nivelAcabamentoInput.sendKeys(nivelAcabamento);
  }

  async getNivelAcabamentoInput() {
    return this.nivelAcabamentoInput.getAttribute('value');
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
