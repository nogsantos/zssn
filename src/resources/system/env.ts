/**
 * App configurations
 * @todo Must be generated on build
 * 
 * @author Fabricio Nogueira
 */
export default {
    api: {
        address: "http://zssn-backend-example.herokuapp.com/api/",
        resources: {
            survivor: "people",
            inventary: "properties",
            report: "report_infection"
        },
        key: "AIzaSyDVM7xQFkBSFFp9RhKcEeStD_hYkMHWwyw"
    },
    conf: {
        messages: {
            error: {
                duration: 5000
            },
            success: {
                duration: 4000
            },
            warn: {
                duration: 5000
            },
            info: {
                duration: 5000
            },
            help: {
                duration: 9000
            }
        },
        storage: {
            name: "survivor"
        }
    }
};
