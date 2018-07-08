const R_DASHBOARD_QUIZ = Vue.component('app-dashboard-quiz', {
    template: `
        <div class="padding_top_3">
            <app-dashboard-quiz-new  :event="event"></app-dashboard-quiz-new>
       </div>
    `,
    props: {
        event: {
            type: String,
            required: true
        }
    },
    data: function () {
        return {
            items: []
        };
    }
});
