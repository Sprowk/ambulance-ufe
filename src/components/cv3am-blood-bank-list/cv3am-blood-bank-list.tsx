import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { BloodBankBagsApi, BloodBag, Configuration } from '../../api/ambulance-wl';

@Component({
  tag: 'cv3am-blood-bank-list',
  styleUrl: 'cv3am-blood-bank-list.css',
  shadow: true,
})
export class Cv3amBloodBankList {

  @Event({ eventName: "bag-clicked"}) bagClicked: EventEmitter<string>;
  @Prop() apiBase: string;
  @Prop() bloodBankId: string;
  @State() errorMessage: string;
  @State() selectedBloodGroup: string = "";
  @State() selectedRhFactor: string = "";

  @State() bloodBags: BloodBag[];

  private async getBloodBagsAsync(): Promise<BloodBag[]> {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const bagsApi = new BloodBankBagsApi(configuration);
      const params: any = { bloodBankId: this.bloodBankId };
      if (this.selectedBloodGroup) {
        params.bloodGroup = this.selectedBloodGroup;
      }
      if (this.selectedRhFactor) {
        params.rhFactor = this.selectedRhFactor;
      }
      const response = await bagsApi.getBloodBagsRaw(params);
      if (response.raw.status < 299) {
        return await response.value();
      } else {
        this.errorMessage = `Cannot retrieve list of blood bags: ${response.raw.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of blood bags: ${err.message || "unknown"}`
    }
    return [];
  }

  async componentWillLoad() {
    this.bloodBags = await this.getBloodBagsAsync();
  }

  private async handleFilterChange() {
    this.bloodBags = await this.getBloodBagsAsync();
  }

  private formatRh(rhFactor: string): string {
    return rhFactor === 'positive' ? '+' : '-';
  }

  render() {
    return (
      <Host>
        {this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
          :
        <div>
          <div class="filter-bar">
            <md-filled-select label="Krvna skupina"
              onInput={(ev: InputEvent) => {
                this.selectedBloodGroup = (ev.target as HTMLInputElement).value;
                this.handleFilterChange();
              }}>
              <md-select-option value="" selected={!this.selectedBloodGroup}>
                <div slot="headline">Vsetky</div>
              </md-select-option>
              {["A", "B", "AB", "O"].map(group =>
                <md-select-option value={group} selected={this.selectedBloodGroup === group}>
                  <div slot="headline">{group}</div>
                </md-select-option>
              )}
            </md-filled-select>

            <md-filled-select label="Rh faktor"
              onInput={(ev: InputEvent) => {
                this.selectedRhFactor = (ev.target as HTMLInputElement).value;
                this.handleFilterChange();
              }}>
              <md-select-option value="" selected={!this.selectedRhFactor}>
                <div slot="headline">Vsetky</div>
              </md-select-option>
              <md-select-option value="positive" selected={this.selectedRhFactor === "positive"}>
                <div slot="headline">+</div>
              </md-select-option>
              <md-select-option value="negative" selected={this.selectedRhFactor === "negative"}>
                <div slot="headline">-</div>
              </md-select-option>
            </md-filled-select>
          </div>

          <md-list>
            {this.bloodBags.map(bag =>
              <md-list-item onClick={ () => this.bagClicked.emit(bag.id)} >
                <div slot="headline">{bag.bloodGroup}{this.formatRh(bag.rhFactor)}</div>
                <div slot="supporting-text">{bag.status} | {bag.volume} ml</div>
                  <md-icon slot="start">water_drop</md-icon>
              </md-list-item>
            )}
          </md-list>
        </div>
        }
        <md-filled-icon-button class="add-button"
          onclick={() => this.bagClicked.emit("@new")}>
          <md-icon>add</md-icon>
        </md-filled-icon-button>
      </Host>
    );
  }
}
