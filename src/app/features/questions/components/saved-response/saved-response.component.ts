import { Component } from '@angular/core';
import {SharedModule} from "../../../../shared";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";

interface RESPONSE_NODE {
  title: string,
  children?: RESPONSE_NODE[]
}

@Component({
  selector: 'app-saved-response',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './saved-response.component.html',
  styleUrl: './saved-response.component.scss'
})
export class SavedResponseComponent {
  SAVED_RESPONSES_TREE: RESPONSE_NODE[] =[{
    title: 'Section name',
    children: [
      {
        title: 'Sub Sections',
        children: [
          {
            title: 'Question',
            children: [
              {
                title: 'Answers and Ratings',
              }
            ]
          }
        ]
      }
    ]
  }]

  treeControl = new NestedTreeControl<RESPONSE_NODE>(node => node.children);
  dataSource = new MatTreeNestedDataSource<RESPONSE_NODE>();

  constructor() {

    this.dataSource.data = this.SAVED_RESPONSES_TREE;
  }

  hasChild = (_: number, node: RESPONSE_NODE) => !!node.children && node.children.length > 0;
}
