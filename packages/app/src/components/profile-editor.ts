import { LitElement, html, css, property } from 'lit';
import { customElement } from 'lit/decorators.js';
import { define, Form, History } from "@calpoly/mustang";
import { Profile } from "server/models";
import { Msg } from "../messages";

@customElement('profile-editor')
class ProfileEditor extends LitElement {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({ type: Object }) init?: Profile;
  @property({ type: String }) userid = '';

  static styles = css`
    /* Your CSS styles here */
  `;

  constructor() {
    super();
    this.addEventListener('mu-form:submit', this._handleSubmit);
  }

  _handleSubmit(event: Form.SubmitEvent<Profile>) {
    this.dispatchMessage([
      "profile/save",
      {
        userid: this.userid,
        profile: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/profile/${this.userid}`
          }),
        onFailure: (error: Error) =>
          console.log("ERROR:", error)
      }
    ]);
  }

  render() {
    return html`
      <mu-form .init=${this.init}>
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" .value=${this.init?.name || ''} required />
        <!-- Add more form fields here -->
        <button type="submit">Save</button>
      </mu-form>
    `;
  }
}
