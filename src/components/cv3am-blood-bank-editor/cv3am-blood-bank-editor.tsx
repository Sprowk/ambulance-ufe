import { Component, Host, Prop, State, h, EventEmitter, Event } from '@stencil/core';
import { BloodBankBagsApi, BloodBag, Configuration } from '../../api/ambulance-wl';

@Component({
  tag: 'cv3am-blood-bank-editor',
  styleUrl: 'cv3am-blood-bank-editor.css',
  shadow: true,
})
export class Cv3amBloodBankEditor {

  @Prop() bagId: string;
  @Prop() bloodBankId: string;
  @Prop() apiBase: string;

  @Event({eventName: "editor-closed"}) editorClosed: EventEmitter<string>;

  @State() bag: BloodBag;
  @State() errorMessage: string;
  @State() isValid: boolean;

  private formElement: HTMLFormElement;
  private deleteDialog: HTMLDialogElement;

  async componentWillLoad() {
    this.getBloodBagAsync();
  }

  private async getBloodBagAsync(): Promise<BloodBag> {
    if(this.bagId === "@new") {
      this.isValid = false;
      this.bag = {
        id: "@new",
        bloodGroup: "A" as any,
        rhFactor: "positive" as any,
        collectionDate: new Date(Date.now()),
        volume: 450,
        status: "available" as any,
        donorId: "",
        notes: "",
      };
      return this.bag;
    }
    if ( !this.bagId ) {
      this.isValid = false;
      return undefined
    }
    try {
      const configuration = new Configuration({
      basePath: this.apiBase,
      });

      const bagsApi = new BloodBankBagsApi(configuration);

      const response = await bagsApi.getBloodBagRaw({bloodBankId: this.bloodBankId, bagId: this.bagId});

      if (response.raw.status < 299) {
          this.bag = await response.value();
          this.isValid = true;
      } else {
          this.errorMessage = `Cannot retrieve blood bag: ${response.raw.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve blood bag: ${err.message || "unknown"}`
    }
    return undefined;
  }

  render() {
    if(this.errorMessage) {
      return (
      <Host>
        <div class="error">{this.errorMessage}</div>
      </Host>
      )
    }
    return (
      <Host>
        <form ref={el => this.formElement = el}>
          <md-filled-select label="Krvna skupina"
            required
            display-text={this.bag?.bloodGroup}
            oninput={(ev: InputEvent) => {
              if(this.bag) {this.bag.bloodGroup = this.handleInputEvent(ev) as any}
            }}>
            <md-icon slot="leading-icon">water_drop</md-icon>
            {["A", "B", "AB", "O"].map(group =>
              <md-select-option value={group} selected={this.bag?.bloodGroup === group}>
                <div slot="headline">{group}</div>
              </md-select-option>
            )}
          </md-filled-select>

          <md-filled-select label="Rh faktor"
            required
            display-text={this.bag?.rhFactor === 'positive' ? '+' : '-'}
            oninput={(ev: InputEvent) => {
              if(this.bag) {this.bag.rhFactor = this.handleInputEvent(ev) as any}
            }}>
            <md-icon slot="leading-icon">bloodtype</md-icon>
            <md-select-option value="positive" selected={this.bag?.rhFactor === 'positive'}>
              <div slot="headline">+ (pozitivny)</div>
            </md-select-option>
            <md-select-option value="negative" selected={this.bag?.rhFactor === 'negative'}>
              <div slot="headline">- (negativny)</div>
            </md-select-option>
          </md-filled-select>

          <md-filled-text-field label="Objem (ml)"
            required type="number" min="1" max="2000" step="1"
            value={this.bag?.volume?.toString()}
            oninput={ (ev: InputEvent) => {
              if(this.bag) {this.bag.volume = Number.parseInt(this.handleInputEvent(ev))}
            } }>
            <md-icon slot="leading-icon">science</md-icon>
          </md-filled-text-field>

          <md-filled-text-field label="ID darcu"
            value={this.bag?.donorId || ""}
            oninput={ (ev: InputEvent) => {
              if(this.bag) {this.bag.donorId = this.handleInputEvent(ev)}
            } }>
            <md-icon slot="leading-icon">person</md-icon>
          </md-filled-text-field>

          {this.bagId !== "@new" ?
            <md-filled-select label="Status"
              display-text={this.bag?.status}
              oninput={(ev: InputEvent) => {
                if(this.bag) {this.bag.status = this.handleInputEvent(ev) as any}
              }}>
              <md-icon slot="leading-icon">info</md-icon>
              {["available", "reserved", "issued", "expired", "destroyed"].map(status =>
                <md-select-option value={status} selected={this.bag?.status === status}>
                  <div slot="headline">{status}</div>
                </md-select-option>
              )}
            </md-filled-select>
          : undefined }

          <md-filled-text-field disabled
            label="Datum odberu"
            value={this.bag?.collectionDate ? new Date(this.bag.collectionDate).toLocaleDateString() : ""}>
            <md-icon slot="leading-icon">calendar_today</md-icon>
          </md-filled-text-field>

          <md-filled-text-field label="Poznamky"
            value={this.bag?.notes || ""}
            oninput={ (ev: InputEvent) => {
              if(this.bag) {this.bag.notes = this.handleInputEvent(ev)}
            } }>
            <md-icon slot="leading-icon">notes</md-icon>
          </md-filled-text-field>
        </form>

        <md-divider inset></md-divider>

        <div class="actions">
          <md-filled-tonal-button id="delete" disabled={!this.bag || this.bag?.id === "@new" }
            onClick={() => this.deleteDialog?.show()} >
            <md-icon slot="icon">delete</md-icon>
            Zmazat
          </md-filled-tonal-button>

          <md-dialog ref={el => this.deleteDialog = el as HTMLDialogElement}>
            <div slot="headline">Zmazat krvny vak?</div>
            <div slot="content">Tato akcia sa neda vratit spat.</div>
            <div slot="actions">
              <md-outlined-button onClick={() => this.deleteDialog?.close()}>Zrusit</md-outlined-button>
              <md-filled-button onClick={() => { this.deleteDialog?.close(); this.deleteBag(); }}>
                Zmazat
              </md-filled-button>
            </div>
          </md-dialog>
          <span class="stretch-fill"></span>
          <md-outlined-button id="cancel"
            onClick={() => this.editorClosed.emit("cancel")}>
            Zrusit
          </md-outlined-button>
          <md-filled-button id="confirm"
            onClick={() => this.updateBag() }
            >
            <md-icon slot="icon">save</md-icon>
            Ulozit
          </md-filled-button>
        </div>
      </Host>
    );
  }

  private handleInputEvent( ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    this.validateForm('silent');
    return target.value
  }

  private validateForm(mode: 'silent' | 'show-errors'): boolean {
    this.isValid = true;
    for (let i = 0; i < this.formElement.children.length; i++) {
      const element = this.formElement.children[i] as HTMLElement & {
        checkValidity?: () => boolean;
        reportValidity?: () => boolean;
      };

      let valid = true;
      if (mode === 'show-errors' && element.reportValidity) {
        valid = element.reportValidity();
      } else if (element.checkValidity) {
        valid = element.checkValidity();
      }
      this.isValid &&= valid;
    }
    return this.isValid;
  }

  private async updateBag() {
    if (!this.validateForm('show-errors')) {
      return;
    }

    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const bagsApi = new BloodBankBagsApi(configuration);
      const response = this.bagId == "@new" ?
        await bagsApi.createBloodBagRaw({bloodBankId: this.bloodBankId, bloodBag: this.bag}) :
        await bagsApi.updateBloodBagRaw({bloodBankId: this.bloodBankId, bagId: this.bagId, bloodBag: this.bag});

      if (response.raw.status < 299) {
        this.editorClosed.emit("store")
      } else {
        this.errorMessage = `Cannot store blood bag: ${await this.extractErrorMessage(response.raw)}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot store blood bag: ${err.message || "unknown"}`
    }
  }

  private async extractErrorMessage(response: Response): Promise<string> {
    try {
      const body = await response.json();
      return body?.message || response.statusText;
    } catch {
      return response.statusText;
    }
  }

  private async deleteBag() {
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const bagsApi = new BloodBankBagsApi(configuration);

      const response = await bagsApi.deleteBloodBagRaw({bloodBankId: this.bloodBankId, bagId: this.bagId});
        if (response.raw.status < 299) {
        this.editorClosed.emit("delete")
        } else {
        this.errorMessage = `Cannot delete blood bag: ${response.raw.statusText}`
        }
    } catch (err: any) {
        this.errorMessage = `Cannot delete blood bag: ${err.message || "unknown"}`
    }
  }
}
