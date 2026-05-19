;;; Directory Local Variables            -*- no-byte-compile: t -*-
;;; For more information see (info "(emacs) Directory Variables")

((markdown-mode . (
                (ispell-dictionary . "pt_BR")
                (eval . (spell-fu-dictionary-add (spell-fu-get-ispell-dictionary "pt_BR")))
              ))
 )
