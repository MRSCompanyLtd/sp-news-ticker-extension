import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as strings from 'NewsTickerApplicationCustomizerStrings';
import Ticker, { ITickerProps } from './components/Ticker';

const LOG_SOURCE: string = 'NewsTickerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface INewsTickerApplicationCustomizerProperties {
  headerMessage: string;
}

export interface INewsTickerItem {
  Id: number;
  Title: string;
  Link: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NewsTickerApplicationCustomizer
  extends BaseApplicationCustomizer<INewsTickerApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _news: INewsTickerItem[] = [];

  public async onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    const url: string = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Breaking News')/items?$select=Id,Title,Link&$filter=Expiry ge '${new Date().toLocaleDateString()}'`;
    
    const news: { value: INewsTickerItem[] } = await this.context.spHttpClient.get(url, SPHttpClient.configurations.v1,
      {
        headers: [
          ['accept', 'application/json;odata=nometadata'],
          ['odata-version', '']
        ]
      }).then((res: SPHttpClientResponse) => res.json());

    this._news = news.value;

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceholder);

    return Promise.resolve();
  }

  private _onDispose(): void {
    console.log('Customizer disposed');
  }

  private _renderPlaceholder(): void {
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
  
      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }
  
      if (this.properties) {
        let topString: string = this.properties.headerMessage;
        if (!topString) {
          topString = "Breaking News";
        }
  
        if (this._topPlaceholder.domElement) {
          const element: React.ReactElement<ITickerProps> = React.createElement(
            Ticker,
            {
              title: topString,
              news: this._news
            }
          )

          ReactDom.render(element, this._topPlaceholder.domElement);

          // if (this._news.length > 0) {
          //   this._topPlaceholder.domElement.innerHTML = `
          //     <div class="${styles.app}" id="app">
          //       <div class="${styles.header}">
          //         ${topString}
          //       </div>
          //       <div class="${styles.wrapper}" id="wrapper">
          //       ${this._news.map((item: INewsTickerItem) => (
          //         `<div class="${styles.update}" id="news-update-${item.Id}">
          //           ${item.Title}
          //         </div>`
          //       )).join('')}
          //       </div>
          //     </div>
          //     `;            
          // }
        }
      }
    }
  }
}
