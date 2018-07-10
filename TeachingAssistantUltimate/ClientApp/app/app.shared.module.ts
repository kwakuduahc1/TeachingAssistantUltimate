import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
//import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { HttpProvider } from './providers/http-provider';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { HttpHandler } from './providers/HttpHandler';
import { SubjectsResolver } from './resolvers/SubjectsResolver';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { EditSubjectComponent } from './components/edit-subject/edit-subject.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ViewQuestionComponent } from './components/view-question/view-question.component';
import { SubjectResolver } from './resolvers/SubjectResolver';
import { QuillEditorModule } from './Editor';
import { TopicsResolver } from './resolvers/TopicsResolver';
import { HttpClientModule } from '@angular/common/http';
import { PrintProviderService } from './providers/print-provider.service';
import { AssTypesComponent } from './components/ass-types/ass-types.component';
import { AssTypesResolver } from './resolvers/AssTypesResolver';
import { EditAssTypeComponent } from './components/edit-ass-type/edit-ass-type.component';
import { AssTypeResolver } from './resolvers/AssTypeResolver';
import { ClassesComponent } from './components/classes/classes.component';
import { ClassessHttpProvider } from './providers/classes-http-provider';
import { AssessTypeHttpProvider } from './providers/ass-types-http-provider';
import { ClassesResolver } from './resolvers/ClassesResolver';
import { PreviewStudentsComponent } from './components/preview-students/preview-students.component';
import { StudentsService } from '../Services/students.service';
import { StudentsHttpProvider } from './providers/students-http-provider';
import { ClassResolver } from './resolvers/ClassResolver';
import { AddResultsComponent } from './components/add-results/add-results.component';
import { StudentsResolver } from './resolvers/StudentsResolver';
import { ResultsHttpProvider } from './providers/results-http-provider';
import { ClassSubjectsResolver } from './resolvers/ClassSubjectsResolver';
import { ViwResultsComponent } from './components/viw-results/viw-results.component';
import { SmartEntryComponent } from './components/smart-entry/smart-entry.component';
import { TagResultsComponent } from './components/tag-results/tag-results.component';
import { TagsResolver } from './resolvers/TagsResolver';
import { AboutComponent } from './components/about/about.component';
import { TopicQuestionsComponent } from './components/topic-questions/topic-questions.component';
import { TopicQuestionsResolver } from './resolvers/TopicQuestionResolver';
import { QuestionResolver } from './resolvers/QuestionResolver';
import { HelpComponent } from './components/help/help.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        SubjectsComponent,
        EditQuestionComponent,
        EditSubjectComponent,
        GeneratorComponent,
        QuestionsComponent,
        ViewQuestionComponent,
        AssTypesComponent,
        EditAssTypeComponent,
        ClassesComponent,
        PreviewStudentsComponent,
        AddResultsComponent,
        ViwResultsComponent,
        SmartEntryComponent,
        TagResultsComponent,
        AboutComponent,
        TopicQuestionsComponent,
        HelpComponent
    ],
    providers: [
        HttpProvider,
        AssessTypeHttpProvider,
        HttpHandler,
        SubjectsResolver,
        SubjectResolver,
        TopicsResolver,
        PrintProviderService,
        AssTypesResolver,
        AssTypeResolver,
        ClassessHttpProvider,
        ClassesResolver,
        StudentsService,
        StudentsHttpProvider,
        ClassResolver,
        StudentsResolver,
        ResultsHttpProvider,
        ClassSubjectsResolver,
        TagsResolver,
        TopicQuestionsResolver,
        QuestionResolver
    ],
    exports: [RouterModule],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        QuillEditorModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'subjects', component: SubjectsComponent, resolve: { subjects: SubjectsResolver } },
            { path: 'edit-subject/:id', component: EditSubjectComponent, resolve: { subject: SubjectResolver } },
            { path: 'add-question/:id', component: QuestionsComponent, resolve: { subject: SubjectResolver } },
            { path: 'edit-question/:id', component: EditQuestionComponent, resolve: { question: QuestionResolver } },
            { path: 'topic-questions/:top/:id', component: TopicQuestionsComponent, resolve: { questions: TopicQuestionsResolver } },
            { path: 'generate/:id', component: GeneratorComponent, resolve: { subject: SubjectResolver, topics: TopicsResolver } },
            { path: 'types', component: AssTypesComponent, resolve: { types: AssTypesResolver } },
            { path: 'edit-type/:id', component: EditAssTypeComponent, resolve: { type: AssTypeResolver } },
            { path: 'classes', component: ClassesComponent, resolve: { classes: ClassesResolver } },
            { path: 'preview-students/:id', component: PreviewStudentsComponent, resolve: { "class": ClassResolver } },
            { path: 'add-results/:id', component: AddResultsComponent, resolve: { "class": ClassResolver, 'students': StudentsResolver, 'types': AssTypesResolver, 'subjects': SubjectsResolver } },
            { path: 'smart-entry/:id', component: SmartEntryComponent, resolve: { "class": ClassResolver, 'students': StudentsResolver, 'types': AssTypesResolver, 'subjects': SubjectsResolver } },
            { path: 'view-results/:id', component: ViwResultsComponent, resolve: { "class": ClassResolver, 'subjects': ClassSubjectsResolver } },
            { path: 'tag-results/:id', component: TagResultsComponent, resolve: { "class": ClassResolver, 'subjects': ClassSubjectsResolver, 'tags': TagsResolver, 'types': AssTypesResolver } },
            { path: 'help', component: HelpComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
