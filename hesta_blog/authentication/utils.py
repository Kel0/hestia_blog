from typing import List, Optional

from django.template import Context, Template


class NavbarItems:
    def __init__(self, columns: List[str]) -> None:
        self.columns = [{"name": column, "is_active": 0} for column in columns]

    def set_active(self, index: int) -> None:
        self.columns[index]["is_active"] = 1

    def to_html(self):
        item_body: str = """
            <li class="nav-item {}">
                <a class="nav-link" href="{}">{}</a>
            </li>
        """
        html: str = ""

        for column in self.columns:
            link_template = Template("{% url '" + column["name"].lower() + "' %}")
            link_value = {column["name"]: column["name"]}
            link = link_template.render(Context(link_value))

            if not column["is_active"]:
                html += item_body.format("", link, column["name"])
            else:
                html += item_body.format("active", link, column["name"])

        return html


def generate_nav_items(active_item: str, nav_items_list: Optional[List[str]] = None):
    """
    Generate navbar items
    :param active_item: Set 1 if login page is active
    :param nav_items_list: List of nav items
    """
    if nav_items_list is None:
        nav_items_list = ["Home", "Login"]

    navbar = NavbarItems(columns=nav_items_list)
    navbar.set_active(nav_items_list.index(active_item.capitalize()))
    return navbar.to_html()
