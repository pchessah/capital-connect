import { Component, inject } from '@angular/core';
import { SharedModule } from "../../../../shared";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { UiComponent } from "../../components/ui/ui.component";
import { RESPONSE_NODE } from '../../interfaces';
import { Router } from '@angular/router';
import { QuestionsService } from '../../services/questions/questions.service';
import { map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-saved-response',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiComponent
  ],
  templateUrl: './saved-response.component.html',
  styleUrl: './saved-response.component.scss'
})
export class SavedResponseComponent {

  private _questionService = inject(QuestionsService);
  private _router = inject(Router);
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  expandedNodeMap = new Map<any, Observable<any[]>>();



  ngOnInit() {
    this._questionService.getAllSections().subscribe(data => {
      this.dataSource.data = data.map(section => ({ ...section, type: 'section' }));
    });
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  getChildren(node: any): Observable<any[]> {
    switch (node.type) {
      case 'section':
        return this._questionService.getSubSectionsOfaSection(node.id).pipe(
          map(subsections => subsections.map(sub => ({ ...sub, type: 'subsection' })))
        );
      case 'subsection':
        return this._questionService.getQuestionsOfSubSection(node.id).pipe(
          map(questions => questions.map(q => ({ ...q, type: 'question' })))
        );
      case 'question':
        return this._questionService.getAnswersOfAQuestion(node.id).pipe(
          map(answers => answers.map(ans => ({ ...ans, type: 'answer' })))
        );
      default:
        return of([]);
    }
  }

  toggleNode(node: any) {
    if (this.treeControl.isExpanded(node)) {
      this.treeControl.collapse(node);
    } else {
      this.expandedNodeMap.set(node, this.getChildren(node));
      this.treeControl.expand(node);
    }
  }
  createSection () {
    this._router.navigateByUrl('/questions/section')
  }
}
